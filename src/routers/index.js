import { Router } from "express";
import Users from "./users.js";
import Kost from "./kost.js";
import Room from "./room.js";

const router = Router();

router.use("/users", Users)
router.use("/kost", Kost)
router.use("/room", Room)

export default router