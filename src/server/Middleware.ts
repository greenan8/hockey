import { Express } from "express"
import * as bodyParser from "body-parser"
import helmet from "helmet"
import * as cors from "cors"
import pino from "pino-http"

import rateLimit from "express-rate-limit"

export class Middleware {
    public static apply(app: Express) {
        app.use(bodyParser.json())
        app.use(
            helmet({
                contentSecurityPolicy: false, // TODO: figure out how to allow script from unpkg
            })
        )
        app.use(
            pino({
                name: "app",
                transport: {
                    target: "pino-pretty",
                    options: {
                        colorize: true,
                        singleLine: true,
                    },
                },
            })
        )
        app.use(cors())
        app.use(
            rateLimit({
                windowMs: 15 * 60 * 1000, // 15 minutes
                max: 100, // limit each IP to 100 requests per windowMs
            })
        )
    }
}
