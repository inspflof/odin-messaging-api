import type { NextFunction, Request, Response } from "express";

import { userQueries } from "../services/db/user.js";

import type { CreateUserBody } from "./user.type.js";

export const userController = {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userQueries.getAll()
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

            const data = await userQueries.create(username, displayName)
            return res.status(201).json(data)
        } catch (err) {
            return next(err)
        }
    }, 
}