import "reflect-metadata";
import { DataSource as Source } from "typeorm";

export const DataSource = new Source({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: ["src/data/entities/*.ts"],
  migrations: ["src/data/migrations/*.ts"],
  migrationsTableName: "migrations",
  subscribers: [],
});
