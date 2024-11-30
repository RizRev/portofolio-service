import { Router } from "express";
import UsersController from "../controller/Users.js";

const router = Router();

router.get("/", UsersController.getUsers);
router.post("/", UsersController.createUsers);

export default router