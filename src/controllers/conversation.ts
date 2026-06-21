import type { Request, Response, NextFunction } from "express";
import type { CreateConversationBody } from "./conversation.type.js";

import { conversationQueries } from "../services/db/conversation.js";


export const conversationController = {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await conversationQueries.getAll()
            return res.status(200).json(data)
        } catch (err) {
            return next(err)
        }
    }, 

    async create(req: Request<{}, {}, CreateConversationBody>, res: Response, next: NextFunction) {
        try {
            const { name, type } = req.body

            const rawUserIds = req.body.userIds

            const userIds = Array.isArray(rawUserIds)
                ? rawUserIds
                : JSON.parse(rawUserIds)

            const data = await conversationQueries.create(type, name, userIds)
            return res.status(200).json(data)
        } catch (err) {
            return next(err)
        }
    }, 
}