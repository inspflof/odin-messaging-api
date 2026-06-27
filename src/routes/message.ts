import { Router } from "express";

const router = Router()

import { MESSAGE_PATHS } from "../config/paths.js";
import { messageController } from "../controllers/message.js";

router.get(MESSAGE_PATHS.GET, messageController.getMessages)

router.post(MESSAGE_PATHS.CREATE, messageController.createMessages)

export default router