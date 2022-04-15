import "reflect-metadata";
import { DataSource as Source } from "typeorm";
import { User } from "data/entities/User";

export const DataSource = new Source({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
