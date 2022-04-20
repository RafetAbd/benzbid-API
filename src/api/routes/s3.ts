import { Router } from "express";
import { generateUploadURL } from "../controllers/s3";

const router = Router();

router.get('/', generateUploadURL);

export default router;