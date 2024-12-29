import { Router } from "express"
import kostController from "../controller/Kost.js"
import { upload, uploadMultiple } from "../middleware/upload/multer.js";

const router = Router()

router.get("/", kostController.getAll);
router.post("/",uploadMultiple("picture"), kostController.createKost);
router.post("/picture", uploadMultiple("picture"), kostController.uploadPicture);

export default router