import { Fetch } from "server/Fetch"
import { paths } from "./nhl.generated"

export class NhlClient {
    private static fetcher = Fetch.buildFetcher<paths>({ baseUrl: "https://statsapi.web.nhl.com/api/v1" }, this.name)

    public static listConferences = this.fetcher.path("/conferences").method("get").create()

    public static getConference = this.fetcher.path("/conferences/{id}").method("get").create()

    public static listDivisions = this.fetcher.path("/divisions").method("get").create()

    public static getDivision = this.fetcher.path("/divisions/{id}").method("get").create()

    public static listTeams = this.fetcher.path("/teams").method("get").create()

    public static getTeam = this.fetcher.path("/teams/{id}").method("get").create()

    public static getTeamRoster = this.fetcher.path("/teams/{id}/roster").method("get").create()

    public static getTeamStats = this.fetcher.path("/teams/{id}/stats").method("get").create()
}
