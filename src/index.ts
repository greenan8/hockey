import * as express from "express"
import { DataSource } from "data/ormconfig"
import { Fetch } from "server/Fetch"
import { Middleware } from "server/Middleware"
import { Routes } from "server/Routes"
import { PopulateFixtures } from "data/PopulateFixtures"

DataSource.initialize()
    .then(async () => {
        const app = express()
        Middleware.applyBeforeRoutes(app)
        Routes.register(app)
        Middleware.applyAfterRoutes(app)
        Fetch.configure()
        app.listen(3000)
        console.log("🏒 Server has started on port 3000: \u001b[1;34mhttp://localhost:3000/docs\u001B[0m 🏒 ")
        PopulateFixtures.run()
    })
    .catch((error) => console.log(error))
