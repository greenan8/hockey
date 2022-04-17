import { Fetcher } from "openapi-typescript-fetch";
import { paths } from "./nhl.generated";

const fetcher = Fetcher.for<paths>();

fetcher.configure({
  baseUrl: "https://statsapi.web.nhl.com/api/v1",
  init: {
    headers: {},
  },
  use: [],
});

export class NhlClient {
  public static listConferences = fetcher
    .path("/conferences")
    .method("get")
    .create();

  public static getConference = fetcher
    .path("/conferences/{id}")
    .method("get")
    .create();

  public static listDivisions = fetcher
    .path("/divisions")
    .method("get")
    .create();

  public static getDivision = fetcher
    .path("/divisions/{id}")
    .method("get")
    .create();

  public static listTeams = fetcher // prettier-ignore
    .path("/teams")
    .method("get")
    .create();

  public static getTeam = fetcher // prettier-ignore
    .path("/teams/{id}")
    .method("get")
    .create();

  public static getTeamRoster = fetcher
    .path("/teams/{id}/roster")
    .method("get")
    .create();

  public static getTeamStats = fetcher
    .path("/teams/{id}/stats")
    .method("get")
    .create();
}
