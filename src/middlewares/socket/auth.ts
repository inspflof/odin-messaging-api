import type { Server } from "socket.io";
import { verify } from "../../utils/jwt.js";
import type { TokenPayload } from "../../controllers/auth.type.js";

type Middleware = Parameters<Server["use"]>[0]

export const socketAuth: Middleware = (socket, next) => {
    try {
        const auth = socket.handshake.auth["token"]

        const payload = verify(auth)

        const { id } = payload as TokenPayload

        socket.data.userId = id
        
        next()
    } catch (err) {
        if(!(err instanceof Error)) {
            return next(new Error("Unknown error"))
        }
        
        if(err.message === "Invalid token") {
            return next(new Error("Invalid token"))
        }

        if(err.message === "Unauthorized") {
            return next(new Error("Unauthorized"))
        }

        return next(new Error("Internal error"))
    }
}