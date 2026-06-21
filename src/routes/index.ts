import { Router } from "express";
const router = Router()

import { PATHS } from "../config/paths.js";

import userRoutes from "./user.js";
router.use(PATHS.USER, userRoutes)

import conversationRoutes from "./conversation.js"
router.use(PATHS.CONVERSATION, conversationRoutes)

export default router