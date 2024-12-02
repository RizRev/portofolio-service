import "reflect-metadata";
import { DataSource } from "typeorm";
const password = `${process.env.DB_PASSWORD}`;
const pgsqlConfig = globalConfig("/pgsqlConfig");
import { globalConfig } from "../../config/index.js";


const AppDataSource = new DataSource({
    type: "postgres",
    host: pgsqlConfig.host,
    port: pgsqlConfig.port,
    username: pgsqlConfig.user,
    password: pgsqlConfig.password,
    database: pgsqlConfig.name,
    synchronize: false, // Aktifkan untuk otomatis membuat tabel
    logging: true,
    entities: ["./entities/*.js"], // Path untuk entity
    migrations: ["./migrations/*.js"],
    connectTimeoutMS: 10000,
});

const pgInit = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected!");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

export {AppDataSource, pgInit};   
