import { Router } from "express";
import imagesController from "../../controllers/api/imagesController.js";

const router = Router();

router.delete("/", imagesController.deleteImage);

export default router;
