import { Router } from "express";
const router = Router()

import { USER_PATHS } from "../config/paths.js";
import { userController } from "../controllers/user.js";
import { authenticationMiddleware } from "../middlewares/authentication.js";

router.get(USER_PATHS.GET_ALL, userController.getAll)
router.post(USER_PATHS.CREATE, userController.create)
router.put(USER_PATHS.EDIT, authenticationMiddleware,userController.edit)

router.get(USER_PATHS.SEARCH, userController.search)

export default router