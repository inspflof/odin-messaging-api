import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { env } from "../config/env.js";
import type { TokenPayload } from "../controllers/auth.type.js";

export async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const header = req.headers.authorization
        if(!header) {
            return res.status(401).json({ message: "Unauthorized"})
        }
        
        const [ type, token ] = header.split(" ")
        if(!token || type !== "Bearer") {
            return res.status(401).json({ message: "Unauthorized"})
        }

        const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET)

        if(
            typeof payload !== "object" ||
            payload === null ||
            !("id" in payload)
        ) {
            throw new jwt.JsonWebTokenError("Invalid token")
        }

        const { id } = payload as TokenPayload    

        req.user = {
            id,
        }

        return next()

    } catch(err) {
        return next(err)
    }
}