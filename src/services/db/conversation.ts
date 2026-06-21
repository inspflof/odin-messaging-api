import { prisma } from "../../config/prisma.js";

import { ConversationType } from "../../generated/prisma/enums.js";

export const conversationQueries = {
    async getAll() {
        return await prisma.conversation.findMany({
            include: {
                users: {
                    include: {
                        user: true
                    }
                }
            }
        })
    },

    async getById(id: string) {
        return await prisma.conversation.findUnique({
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

    async create(type: ConversationType = "DIRECT", name: string | null = null, userIds: string[]) {
        return await prisma.$transaction(async (tx) => {
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

    async addUsers(userIds: string[], conversationId: string) {
        return await prisma.conversationUser.createMany({
            data: userIds.map(userId => ({
                conversationId,
                userId
            })),
            skipDuplicates: true
        })
    },

    async removeUsers(userIds: string[], conversationId: string) {
        return await prisma.conversationUser.deleteMany({
            where: {
                conversationId,
                userId: {
                    in: userIds
                }
            }
        })
    },

    async getUsers(conversationId: string) {
        const conversation = await prisma.conversation.findUnique({
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
    }
}