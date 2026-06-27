import { Router } from "express";
const router = Router()

import { PATHS } from "../config/paths.js";

import userRoutes from "./user.js";
router.use(PATHS.USER, userRoutes)

import conversationRoutes from "./conversation.js"
router.use(PATHS.CONVERSATION, conversationRoutes)

import messageRoutes from "./message.js";
router.use(PATHS.MESSAGE, messageRoutes)

import authRoutes from "./auth.js";
router.use(PATHS.AUTH, authRoutes)

export default router