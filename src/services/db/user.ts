import { prisma } from "../../config/prisma.js";

export const userQueries = {
    async getAll() {
        return await prisma.user.findMany()
    },
    
    async create(username: string, displayName: string,) {
        return await prisma.user.create({
            data: {
                username,
                displayName
            }
        })
    }
}