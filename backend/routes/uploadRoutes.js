import express from "express"
import upload from "../middlewares/upload"
import { removeProductImage, uploadProductImages } from "../controllers/uploadController"
import {isAuth} from "../middlewares/isAuth.js"
import {isAdmin} from "../middlewares/isAdmin.js"

const router = express.Router();

router.post(
    "/images",
    isAuth,
    upload.array("images", 5),
    uploadProductImages
);

router.delete("/images", isAuth, isAdmin, removeProductImage);

export default router