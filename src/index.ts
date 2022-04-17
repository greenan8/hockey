import * as express from "express"
import { DataSource } from "data/ormconfig"
import { Fetch } from "server/Fetch"
import { Middleware } from "server/Middleware"
import { Routes } from "server/Routes"

DataSource.initialize()
    .then(async () => {
        const app = express()
        Middleware.apply(app)
        Routes.register(app)
        Fetch.configure()
        app.listen(3000)
        console.log("🏒 Server has started on port 3000: \u001b[1;34mhttp://localhost:3000/docs\u001B[0m 🏒 ")
    })
    .catch((error) => console.log(error))
