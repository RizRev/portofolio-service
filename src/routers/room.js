import { Router } from "express";
import roomController from "../controller/Room.js";

const router = Router();

router.get("/", roomController.getAll);

export default router