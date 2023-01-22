import "reflect-metadata"
import { DataSource as Source } from "typeorm"

const database = process.env.NODE_ENV === "test" ? "open-hockey-test" : "open-hockey"

export const DataSource = new Source({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database,
    synchronize: true,
    dropSchema: process.env.NODE_ENV === "test",
    logging: false,
    entities: ["src/data/entities/*.ts"],
    migrations: ["src/data/migrations/*.ts"],
    migrationsTableName: "migrations",
    subscribers: [],
})
