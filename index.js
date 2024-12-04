import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mainRouter from "./src/routers/index.js";
import { response } from "./src/middleware/response.js";
import {pgInit} from "./src/database/connection/typeOrm.js";
import pkg from "pg";
const { Pool } = pkg;
dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Service is running");
});

app.use("/", mainRouter);

app.all("*", (req, res) => {
    response(res, {
        status: false,
        code: 404,
        message: "URL not found",
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}, ${process.env.DB_USER}, ${process.env.DB_PASSWORD}!`);
});

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
    })
    .catch((err) => {
        console.error("Connection failed:", err.message);
    });

// pgInit();
export { pool };