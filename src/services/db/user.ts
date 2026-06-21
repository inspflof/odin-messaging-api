import { prisma } from "../../config/prisma.js";

export const userQueries = {
    async getAll() {
        return prisma.user.findMany()
    },
    
    async create(username: string, displayName: string,) {
        return prisma.user.create({
            data: {
                username,
                displayName
            }
        })
    }
}