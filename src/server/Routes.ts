import { Express } from "express"
import { RegisterRoutes } from "oas/routes"
import path = require("path")

export class Routes {
    public static register(app: Express) {
        // register tsoa routes
        RegisterRoutes(app)

        // register documentation routes
        app.get("/oas.json", async (req, res) => {
            const fileDirectory = path.resolve(__dirname, "../", "oas/")
            res.sendFile("oas.json", { root: fileDirectory })
        })

        app.get("/docs", async (req, res) => {
            const fileDirectory = path.resolve(__dirname, "../", "oas/")
            res.sendFile("oas.html", { root: fileDirectory })
        })
    }
}
