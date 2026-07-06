import { Router } from "express";
const router = Router()

import { CONVERSATION_PATHS } from "../config/paths.js";
import { conversationController } from "../controllers/conversation.js";
import { authenticationMiddleware } from "../middlewares/authentication.js";

router.get(CONVERSATION_PATHS.GET_ALL, authenticationMiddleware,conversationController.getAll)
router.get(CONVERSATION_PATHS.GET_BY_ID, conversationController.getById)
router.get(CONVERSATION_PATHS.USERS.GET, conversationController.getUsers)

router.post(CONVERSATION_PATHS.CREATE, conversationController.create)
router.post(CONVERSATION_PATHS.USERS.ADD, conversationController.addUsers)

router.delete(CONVERSATION_PATHS.USERS.REMOVE, conversationController.removeUsers)


export default router