import type { Context } from "../../config/context.js";

export const userQueries = {
    async getAll(ctx: Context) {
        return await ctx.prisma.user.findMany()
    },
    
    async create(username: string, displayName: string, ctx: Context) {
        return await ctx.prisma.user.create({
            data: {
                username,
                displayName
            }
        })
    }
}