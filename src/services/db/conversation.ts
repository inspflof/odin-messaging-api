import { prisma } from "../../config/prisma.js";

import { ConversationType } from "../../generated/prisma/enums.js";

export const conversationQueries = {
    async getAll() {
        return prisma.conversation.findMany({
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
        return prisma.conversationUser.createMany({
            data: userIds.map(userId => ({
                conversationId,
                userId
            })),
            skipDuplicates: true
        })
    },

    async removeUser(userId: string, conversationId: string) {
        return prisma.conversationUser.deleteMany({
            where: {
                userId,
                conversationId
            }
        })
    }
}