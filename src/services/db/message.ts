import type { Context } from "../../config/context.js"

export const messageQueries = {
    async getMessages(conversationId: string, ctx: Context) {
        return await ctx.prisma.message.findMany({
            where: { conversationId }
        })
    },

    async createMessages(conversationId: string, userId: string, contents: string[], ctx: Context) {
        return await ctx.prisma.message.createManyAndReturn({
            data: contents.map(content => ({
                conversationId,
                userId, 
                content
            }))
        })
    }
}