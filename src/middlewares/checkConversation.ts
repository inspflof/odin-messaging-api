import type { Request, Response, NextFunction } from "express";
import { conversationQueries } from "../services/db/conversation.js";
import { ctx } from "../config/context.js";

type ConversationParams = {
    conversationId: string;
}

export async function checkConversation(req:Request<ConversationParams>, res: Response, next: NextFunction) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        const { conversationId } = req.params 
        
        const conversation = await conversationQueries.checkUser(conversationId, req.user.id, ctx)
        
        if(!conversation) {
            return res.status(403).json({ message: "Forbidden" });
        }

        return next()

    } catch (err) {
        return next(err)
    }
}