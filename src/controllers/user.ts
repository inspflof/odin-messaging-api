import type { NextFunction, Request, Response } from "express";
import type { CreateUserBody } from "./user.type.js";

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
            const { displayName, username } = req.body

            if(!displayName || !username) {
                return res.status(400).json({ message: "Missing fields" });
            }

            const data = await userQueries.create(username, displayName, ctx)
            return res.status(201).json(data)
        } catch (err) {
            return next(err)
        }
    }, 
}