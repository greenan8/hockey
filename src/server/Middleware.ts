import { Express, NextFunction, Request, Response } from "express"
import * as bodyParser from "body-parser"
import helmet from "helmet"
import * as cors from "cors"
import pino from "pino-http"

import rateLimit from "express-rate-limit"
import { ValidateError } from "tsoa"

export class Middleware {
    public static applyBeforeRoutes(app: Express) {
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
                        ignore: "pid,hostname",
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

    public static applyAfterRoutes(app: Express) {
        app.use(this.errorHandler)
    }

    private static errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
        if (err instanceof ValidateError) {
            console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
            return res.status(422).json({
                message: "Validation Failed",
                details: err?.fields,
            })
        }
        if (err instanceof Error) {
            return res.status(500).json({
                message: "Internal Server Error",
                details: err,
            })
        }
        next()
    }
}
