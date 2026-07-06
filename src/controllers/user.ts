import type { NextFunction, Request, Response } from "express";
import type { CreateUserBody, EditUserBody, SearchUserQuery } from "./user.type.js";

import { userQueries } from "../services/db/user.js";
import { ctx } from "../config/context.js";

export const userController = {
    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userQueries.getAll(ctx)
            return res.status(200).json(data)
        } catch (err) {
            return next(err)
        }
    }, 

    async create(req: Request<{}, {}, CreateUserBody>, res: Response, next: NextFunction) {
        try {
            const { displayName, username, password } = req.body

            if(!displayName || !username || !password) {
                return res.status(400).json({ message: "Missing fields" });
            }

            const data = await userQueries.create(username, displayName, password, ctx)
            return res.status(201).json(data)
        } catch (err) {
            return next(err)
        }
    }, 

    async edit(req: Request<{}, {}, EditUserBody>, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const userId = req.user.id

            const { displayName, username } = req.body

            const data = await userQueries.edit(userId, {
                displayName,
                username
            }, ctx)
            return res.status(201).json(data)
        } catch (err) {
            return next(err)
        }
    },

    async search(req: Request<{}, {}, {}, SearchUserQuery>, res: Response, next: NextFunction) {
        try {
            const username = String(req.query.username ?? "").trim()

            const data = await userQueries.search(username, ctx)

            return res.status(200).json(data)
        } catch(err) {
            return next(err)
        }
    }
}