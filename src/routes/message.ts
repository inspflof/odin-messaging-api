import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/authentication.js";
import { checkConversation } from "../middlewares/checkConversation.js";

const router = Router({
    mergeParams: true
})

import { MESSAGE_PATHS } from "../config/paths.js";
import { messageController } from "../controllers/message.js";

router.get(MESSAGE_PATHS.GET, authenticationMiddleware, checkConversation, messageController.getMessages)

router.post(MESSAGE_PATHS.CREATE, authenticationMiddleware, checkConversation, messageController.createMessages)

export default router