import type { Server, Socket } from "socket.io"
import type { Message } from "../generated/prisma/client.js"

export function chatHandlers(io: Server, socket: Socket) {
    socket.on("join_conversation", async (conversationId: string) => {
        socket.join(conversationId)
    })
    
    socket.on("message", ({ conversationId, data }: { conversationId: string, data: Message[] }) => {
        io.to(conversationId).emit("message", {
            conversationId,
            data
        })
    })
}