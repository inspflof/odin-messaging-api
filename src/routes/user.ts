import { Router } from "express";
const router = Router()

import { USER_PATHS } from "../config/paths.js";
import { userController } from "../controllers/user.js";

router.get(USER_PATHS.GET_ALL, userController.getAll)
router.post(USER_PATHS.CREATE, userController.create)

export default router