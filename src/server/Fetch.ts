import fetch, { Headers, Request, Response } from "node-fetch"
import { Fetcher, Middleware } from "openapi-typescript-fetch"
import { FetchConfig, OpenapiPaths } from "openapi-typescript-fetch/dist/cjs/types"
import pino from "pino"

export class Fetch {
    public static configure() {
        if (!globalThis.fetch) {
            globalThis.fetch = fetch
            globalThis.Headers = Headers
            globalThis.Request = Request
            globalThis.Response = Response
        }
    }

    public static buildFetcher<Paths extends OpenapiPaths<Paths>>(config: FetchConfig, loggerName: string) {
        const logger = pino({
            name: loggerName,
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    singleLine: true,
                    ignore: "pid,hostname",
                },
            },
        })
        const log: Middleware = async (url, init, next) => {
            const response = await next(url, init)
            logger.info(response, `fetched ${url}`)
            return response
        }
        const fetcher = Fetcher.for<Paths>()
        fetcher.configure({ ...config, use: [...(config.use || []), log] })
        return fetcher
    }
}
