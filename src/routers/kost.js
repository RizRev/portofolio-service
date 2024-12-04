import { Router } from "express"
import kostController from "../controller/Kost.js"

const router = Router()

router.get("/", kostController.getAll);
router.post("/", kostController.createKost);

export default router