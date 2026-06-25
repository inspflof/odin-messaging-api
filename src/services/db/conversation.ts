import type { Context } from "../../config/context.js";

import { ConversationType } from "../../generated/prisma/enums.js";

export const conversationQueries = {
    async getAll(ctx: Context) {
        return await ctx.prisma.conversation.findMany({
            include: {
                users: {
                    include: {
                        user: true
                    }
                }
            }
        })
    },

    async getById(id: string, ctx: Context) {
        return await ctx.prisma.conversation.findUnique({
            where: { id },
            include: {
                users: {
                    include: {
                        user: true
                    }
                }
            }
        })
    },

    async create(type: ConversationType = "DIRECT", name: string | null = null, userIds: string[], ctx: Context) {
        return await ctx.prisma.$transaction(async (tx) => {
            const conversation = await tx.conversation.create({
                data : {
                    type,
                    name
                }
            })
            await tx.conversationUser.createMany({
                data: userIds.map(userId => ({
                    userId,
                    conversationId: conversation.id
                }))
            })

            return conversation
        })
    },

    async addUsers(userIds: string[], conversationId: string, ctx: Context) {
        return await ctx.prisma.conversationUser.createMany({
            data: userIds.map(userId => ({
                conversationId,
                userId
            })),
            skipDuplicates: true
        })
    },

    async removeUsers(userIds: string[], conversationId: string, ctx: Context) {
        return await ctx.prisma.conversationUser.deleteMany({
            where: {
                conversationId,
                userId: {
                    in: userIds
                }
            }
        })
    },

    async getUsers(conversationId: string, ctx: Context) {
        const conversation = await ctx.prisma.conversation.findUnique({
            where: { id: conversationId},
            select: {
                users: {
                    select: {
                        user: true
                    }
                }
            }
        })

        return conversation?.users.map(({ user }) => user)
    },

    async getMessages(conversationId: string, ctx: Context) {
        return await ctx.prisma.message.findMany({
            where: { conversationId }
        })
    },

    async createMessages(conversationId: string, userId: string, contents: string[], ctx: Context) {
        return await ctx.prisma.message.createMany({
            data: contents.map(content => ({
                conversationId,
                userId, 
                content
            }))
        })
    }
}