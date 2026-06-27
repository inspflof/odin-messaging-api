import { Router } from "express";
const router = Router()

import { AUTH_PATHS } from "../config/paths.js";
import { authController } from "../controllers/auth.js";

router.post(AUTH_PATHS.LOGIN, authController.login)
router.post(AUTH_PATHS.REFRESH, authController.refresh)
router.post(AUTH_PATHS.LOGOUT, authController.logout)

router.get(AUTH_PATHS.ME, authController.me)

export default router