import { Router } from "express";
const router = Router()

import { CONVERSATION_PATHS } from "../config/paths.js";
import { conversationController } from "../controllers/conversation.js";

router.get(CONVERSATION_PATHS.GET_ALL, conversationController.getAll)
router.get(CONVERSATION_PATHS.GET_BY_ID, conversationController.getById)

router.post(CONVERSATION_PATHS.CREATE, conversationController.create)



export default router