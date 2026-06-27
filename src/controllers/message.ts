import type { Request, Response, NextFunction } from "express"
import { messageQueries } from "../services/db/message.js"
import type { CreateMessagesBody, CreateMessagesParams, GetMessagesParams } from "./message.type.js"
import { ctx } from "../config/context.js"

export const messageController = {
        async getMessages(req: Request<GetMessagesParams>, res: Response, next: NextFunction) {
        try {
            const { conversationId } = req.params 

            const data = await messageQueries.getMessages(conversationId, ctx)
            return res.status(200).json(data)
        } catch (err) {
            return next(err)
        }
    }, 

    async createMessages(req: Request<CreateMessagesParams, {}, CreateMessagesBody>, res: Response, next: NextFunction) {
        try {
            const { conversationId } = req.params 
            const { userId } = req.body

            const rawContents = req.body.contents

            const contents = Array.isArray(rawContents)
                ? rawContents
                : JSON.parse(rawContents)

            if(!conversationId || !userId || !rawContents) {
                return res.status(400).json({ message: "Missing fields" })
            }
            
            const data = await messageQueries.createMessages(conversationId, userId, contents, ctx)
            return res.status(200).json(data)
        } catch (err) {
            return next(err)
        }
    }, 
}