import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mainRouter from "./src/routers/index.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/", mainRouter);

app.get("/", (req, res) => {
    res.send("Service is running");
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});