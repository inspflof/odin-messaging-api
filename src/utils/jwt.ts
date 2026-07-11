import { env } from "../config/env.js";
import jwt from "jsonwebtoken";

export function verify(auth: string) {

    const [ type, token ] = auth.split(" ")
    if(!token || type !== "Bearer") {
        throw new Error("Unauthorized")
    }

    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET)

    if(
        typeof payload !== "object" ||
        payload === null ||
        !("id" in payload)
    ) {
        throw new jwt.JsonWebTokenError("Invalid token")
    }

    return payload
}