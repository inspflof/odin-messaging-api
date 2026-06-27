import type { Request, Response, NextFunction } from "express"
import { userQueries } from "../services/db/user.js"
import { ctx } from "../config/context.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { env } from "../config/env.js"

import type { LoginAuthBody, TokenPayload } from "./auth.type.js"

export const authController = {
    async login(req: Request<{}, {}, LoginAuthBody>, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body
            
            if(!username || !password) {
                return res.status(400).json({ message: "Missing fields" })
            }

            const user = await userQueries.getByUsername(username, ctx)

            if(!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: "Invalid credentials" })
            }

            const { id: userId } = user

            const accessToken = jwt.sign({ id: userId }, env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" })

            const refreshToken = jwt.sign({ id: userId }, env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" })

            res.status(200).cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: env.NODE_ENV === "production" ? "strict" : "lax",
                maxAge: 1000 * 60 * 60 * 24 * 30,
                secure: env.NODE_ENV === "production",
                path: "/"
            }).json({ accessToken })

        } catch (err) {
            return next(err)
        }
    },

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies["refreshToken"]
            if(!refreshToken) {
                return res.status(401).json({ message: "Unauthorized" })
            }

            const payload = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET)

            if(
                typeof payload !== "object" ||
                payload === null ||
                !("id" in payload)
            ) {
                throw new jwt.JsonWebTokenError("Invalid token")
            }

            const { id } = payload as TokenPayload

            const user = await userQueries.getById(id, ctx)
            if(!user) {
                return res.status(401).json({ message: "Unauthorized" })
            }

            const accessToken = jwt.sign({ id: user.id}, env.ACCESS_TOKEN_SECRET, {
                expiresIn: "10m"
            })

            return res.status(200).json({ accessToken })

        } catch (err) {
            return next(err)
        }
    },

    async logout(_req: Request, res: Response, _next: NextFunction) {
        return res.status(200).clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: env.NODE_ENV === "production" ? "strict" : "lax",
                maxAge: 1000 * 60 * 60 * 24 * 30,
                secure: env.NODE_ENV === "production",
                path: "/"
            }).json({ message: "Logged out"})
    },

    async me(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            
            const id = req.user.id

            const user = await userQueries.getById(id, ctx)
            
            if(!user) {
                return res.status(401).json({ message: "Unauthorized" })
            }

            return res.status(200).json(user)

        } catch(err) {
            return next(err)
        }
    }
}