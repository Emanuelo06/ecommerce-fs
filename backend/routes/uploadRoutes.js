import express from "express"
import upload from "../middlewares/upload"
import { uploadProductImages } from "../controllers/uploadController"
import {isAuth} from "../middlewares/isAuth.js"

const router = express.Router();

router.post(
    "/product/:id/images",
    isAuth,
    upload.array("images", 5),
    uploadProductImages
);

export default router