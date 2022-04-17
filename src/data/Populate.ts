import { NhlClient } from "features/clients/nhl/NhlClient"
import { Conference } from "./entities/Conference"
import { DataSource } from "./ormconfig"

export class Populate {
    public static async run() {
        this.fetchConferences()
    }

    public static async fetchConferences() {
        const response = await NhlClient.listConferences({})
        for (const conference of response.data.conferences) {
            await DataSource.manager.save(Conference, { sourceId: conference.id, name: conference.name, active: conference.active })
        }
    }
}
