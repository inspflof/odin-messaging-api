import type { NextFunction, Request, Response } from "express";

import { userQueries } from "../services/db/user.js";

export const userController = {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userQueries.getAll()
            return res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}