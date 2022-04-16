import * as express from "express";
import * as bodyParser from "body-parser";
import { DataSource } from "data/DataSource";
import { User } from "data/entities/User";
import { RegisterRoutes } from "spec/routes";
import path = require("path");
import helmet from "helmet";
const cors = require("cors");
import rateLimit from "express-rate-limit";

DataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();

    // use middlewares
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(cors());
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      })
    );

    // register routes
    RegisterRoutes(app);

    // register documentation routes
    app.get("/swagger.json", async (req, res) => {
      const fileDirectory = path.resolve(__dirname, ".", "spec/");
      res.sendFile("swagger.json", { root: fileDirectory });
    });

    // start express server
    app.listen(3000);

    // insert new users for test
    await DataSource.manager.save(
      DataSource.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27,
      })
    );
    await DataSource.manager.save(
      DataSource.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24,
      })
    );

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch((error) => console.log(error));