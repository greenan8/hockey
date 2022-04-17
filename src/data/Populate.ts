import { NhlClient } from "features/clients/nhl/NhlClient"
import { Conference } from "./entities/Conference"
import { Division } from "./entities/Division"
import { DataSource } from "./ormconfig"

export class Populate {
    public static async run() {
        await this.fetchConferences()
        await this.fetchDivisions()
    }

    public static async fetchConferences() {
        if ((await DataSource.manager.count(Conference)) === 0) {
            const response = await NhlClient.listConferences({})
            for (const conference of response.data.conferences) {
                await DataSource.manager.save(Conference, { sourceId: conference.id, name: conference.name, active: conference.active })
            }
        }
    }

    public static async fetchDivisions() {
        if ((await DataSource.manager.count(Division)) === 0) {
            const response = await NhlClient.listDivisions({})
            for (const division of response.data.divisions) {
                await DataSource.manager.save(Division, {
                    sourceId: division.id,
                    name: division.name,
                    active: division.active,
                    conference: await DataSource.manager.findOneBy(Conference, { sourceId: division.conference.id }),
                })
            }
        }
    }
}
