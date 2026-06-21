import { Router } from "express";
const router = Router()

import { PATHS } from "../config/paths.js";

import userRoutes from "./user.js";
router.use(PATHS.USER, userRoutes)

export default router