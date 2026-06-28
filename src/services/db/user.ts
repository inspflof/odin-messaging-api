import type { Context } from "../../config/context.js";

export const userQueries = {
    async getAll(ctx: Context) {
        return await ctx.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                displayName: true,
                createdAt: true,
            }
        })
    },
    
    async create(username: string, displayName: string, password: string, ctx: Context) {
        return await ctx.prisma.user.create({
            data: {
                username,
                displayName,
                password
            }
        })
    },

    async getByUsername(username: string, ctx: Context) {
        return await ctx.prisma.user.findUnique({
            where: { username }
        })
    },

    async getById(id: string, ctx: Context) {
        return await ctx.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                displayName: true,
                createdAt: true,
            }
        })
    }
}