import fetch, { Headers, Request, Response } from "node-fetch"
import { Fetcher } from "openapi-typescript-fetch"
import { FetchConfig, OpenapiPaths } from "openapi-typescript-fetch/dist/cjs/types"

export class Fetch {
    public static configure() {
        if (!globalThis.fetch) {
            globalThis.fetch = fetch
            globalThis.Headers = Headers
            globalThis.Request = Request
            globalThis.Response = Response
        }
    }

    public static buildFetcher<Paths extends OpenapiPaths<Paths>>(config: FetchConfig) {
        const fetcher = Fetcher.for<Paths>()
        fetcher.configure(config)
        return fetcher
    }
}
