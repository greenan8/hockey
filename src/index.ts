import * as express from "express";
import * as bodyParser from "body-parser";
import { DataSource } from "data/DataSource";
import { User } from "data/entities/User";
import { RegisterRoutes } from "spec/routes";

DataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    // register routes
    // setup express app here
    RegisterRoutes(app);
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
