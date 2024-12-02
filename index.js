import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mainRouter from "./src/routers/index.js";
import { response } from "./src/middleware/response.js";
// import pool from "./src/database/connection/pg.js";
import {AppDataSource, pgInit} from "./src/database/connection/typeOrm.js";
import { DataSource } from "typeorm";
import pkg from "pg";
const { Client, Pool } = pkg;
dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/", mainRouter);

app.all("*", (req, res) => {
    response(res, {
        status: false,
        code: 404,
        message: "URL not found",
    });
});

app.get("/", (req, res) => {
    res.send("Service is running");
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}, ${process.env.DB_USER}, ${process.env.DB_PASSWORD}!`);
});
// const AppDataSource = new DataSource({
//     type: "postgres",
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     synchronize: true, // Aktifkan untuk otomatis membuat tabel
//     logging: true,
//     entities: ["./entities/*.js"], // Path untuk entity
//     migrations: ["./migrations/*.js"],
// });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

pool.connect()
    .then(() => {
        console.log("Connected to PostgreSQL!");
        // pool.end();
    })
    .catch((err) => {
        console.error("Connection failed:", err.message);
        // pool.end();
    });

pgInit();

// AppDataSource.initialize()
//     .then(() => {
//         console.log("Database connected!");

//         // Menjalankan server Express setelah database terhubung
//         app.listen(process.env.PORT, () => {
//             console.log(`Example app listening on port ${process.env.PORT}!`);
//         });
//     })
//     .catch((error) => {
//         console.error("Database connection failed:", error);
//     });

// const client = new Client({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//   });

//   client.connect()
//     .then(() => {
//       console.log("Connected to PostgreSQL!");
//       client.end();
//     })
//     .catch((err) => {
//       console.error("Connection failed:", err.message);
//       client.end();
//     });
export { pool };

process.on("SIGINT", () => {
    pool.end(() => {
        console.log("Pool has been disconnected");
        process.exit(0); // Keluar dengan kode sukses
    });
});
