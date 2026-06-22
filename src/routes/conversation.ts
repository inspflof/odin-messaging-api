import { Router } from "express";
const router = Router()

import { CONVERSATION_PATHS } from "../config/paths.js";
import { conversationController } from "../controllers/conversation.js";

router.get(CONVERSATION_PATHS.GET_ALL, conversationController.getAll)
router.get(CONVERSATION_PATHS.GET_BY_ID, conversationController.getById)
router.get(CONVERSATION_PATHS.GET_USERS, conversationController.getUsers)
router.get(CONVERSATION_PATHS.GET_MESSAGES, conversationController.getMessages)

router.post(CONVERSATION_PATHS.CREATE, conversationController.create)
router.post(CONVERSATION_PATHS.ADD_USERS, conversationController.addUsers)
router.post(CONVERSATION_PATHS.CREATE_MESSAGES, conversationController.createMessages)

router.delete(CONVERSATION_PATHS.REMOVE_USERS, conversationController.removeUsers)


export default router