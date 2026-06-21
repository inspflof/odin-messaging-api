import { prisma } from "../../config/prisma.js";

import { ConversationType } from "../../generated/prisma/enums.js";

export const conversationQueries = {
    async getAll() {
        return prisma.conversation.findMany()
    },

    async create(type: ConversationType, name: string | null = null) {
        return prisma.conversation.create({
            data: {
                type,
                name
            }
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