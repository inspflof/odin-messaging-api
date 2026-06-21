import type { Request, Response, NextFunction } from "express";
import type { AddUserConversationBody, AddUserConversationParams, CreateConversationBody, GetByIdConversationParams, GetUserConversationParams } from "./conversation.type.js";

import { conversationQueries } from "../services/db/conversation.js";


export const conversationController = {
    async getAll(_req: Request, res: Response, next: NextFunction) {
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

    async getById(req: Request<GetByIdConversationParams>, res: Response, next: NextFunction) {
        try {
            const { conversationId } = req.params

            if(!conversationId) {
                return res.status(400).json({ message: "Missing fields" })
            }

            const data = await conversationQueries.getById(conversationId)
            return res.status(200).json(data)
        } catch (err) {
            return next(err)
        }
    }, 

    async getUsers(req: Request<GetUserConversationParams>, res: Response, next: NextFunction) {
        try {
            const { conversationId } = req.params

            if(!conversationId) {
                return res.status(400).json({ message: "Missing fields" })
            }

            const data = await conversationQueries.getUsers(conversationId)
            return res.status(200).json(data)
        } catch (err) {
            return next(err)
        }
    }, 

    async addUsers(req: Request<AddUserConversationParams, {}, AddUserConversationBody>, res: Response, next: NextFunction) {
        try {
            const { conversationId } = req.params
            const rawUserIds = req.body.userIds

            const userIds = Array.isArray(rawUserIds)
                ? rawUserIds
                : JSON.parse(rawUserIds)

            if(!conversationId || !userIds) {
                return res.status(400).json({ message: "Missing fields" })
            }

            const data = await conversationQueries.addUsers(userIds, conversationId)
            return res.status(200).json(data)
        } catch (err) {
            return next(err)
        }
    }, 
}