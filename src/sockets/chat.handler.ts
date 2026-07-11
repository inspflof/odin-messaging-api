import type { Server, Socket } from "socket.io"
import type { Message } from "../generated/prisma/client.js"
import { conversationQueries } from "../services/db/conversation.js"
import { ctx } from "../config/context.js"

export function chatHandlers(io: Server, socket: Socket) {
    socket.on("join_conversation", async (conversationId: string) => {
        try {
            const { userId } = socket.data
            const hasAccess = await conversationQueries.checkUser(conversationId, userId, ctx)

            if(!hasAccess) {
                socket.emit("error", { message: "Unauthorized"})
                return
            }

            socket.join(conversationId)
        } catch (err) {
            socket.emit("error", { message: "Internal error"})
        }
    })
    
    socket.on("message", ({ conversationId, data }: { conversationId: string, data: Message[] }) => {
        io.to(conversationId).emit("message", {
            conversationId,
            data
        })
    })
}