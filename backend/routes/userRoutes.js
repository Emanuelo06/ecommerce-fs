import express from "express"
import * as userController from "../controllers/userController.js"
import { validate } from "../middlewares/validate.js";
import { updateUserSchema } from "../validation/userValidation.js";
import { z } from "zod";

const router = express.Router()

const userIdParamSchema = z.object({
  id: z.string().length(24, "Invalid MongoDB ObjectId")
});

router.get("/:id",validate(userIdParamSchema, "params"), userController.getUser)
router.put("/:id", validate(updateUserSchema), userController.updateUser)
router.delete("/:id",validate(userIdParamSchema, "params"), userController.deleteUser)

export default router
