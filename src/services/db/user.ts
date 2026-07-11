import type { Context } from "../../config/context.js";
import type { UserEditBody } from "../../types/user.js";

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
            },
            select: {
                id: true,
                username: true,
                displayName: true,
                createdAt: true,
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
    },
    
    async edit(id: string, rawData: UserEditBody, ctx: Context) {
        const data = Object.fromEntries(
            Object.entries(rawData).filter(([_, value]) => value !== undefined)
        )

        return await ctx.prisma.user.update({
            where: {id},
            data,
            select: {
                id: true,
                username: true,
                displayName: true,
                createdAt: true,
            }
        })
    },

    async search(name: string, ctx: Context) {
        return await ctx.prisma.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: name,
                            mode: "insensitive"
                        }
                    },
                    {
                        displayName: {
                            contains: name,
                            mode: "insensitive"
                        }
                    }
                ]
            },
            select: {
                id: true,
                username: true,
                displayName: true,
                createdAt: true
            }
        })
    }
}