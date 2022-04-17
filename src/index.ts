import * as express from "express";
import * as bodyParser from "body-parser";
import { DataSource } from "data/DataSource";
import { RegisterRoutes } from "oas/routes";
import path = require("path");
import helmet from "helmet";
const cors = require("cors"); // eslint-disable-line
const morgan = require("morgan"); // eslint-disable-line
import rateLimit from "express-rate-limit";
import "fetch-config";

DataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();

    // use middlewares
    app.use(bodyParser.json());
    app.use(
      helmet({
        contentSecurityPolicy: false, // TODO: figure out how to allow script from unpkg
      })
    );
    app.use(morgan("dev"));
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

    app.get("/swagger", async (req, res) => {
      const fileDirectory = path.resolve(__dirname, ".", "spec/");
      res.sendFile("swagger.html", { root: fileDirectory });
    });

    // start express server
    app.listen(3000);

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch((error) => console.log(error));
