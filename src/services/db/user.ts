import { prisma } from "../../config/prisma.js";

export const userQueries = {
    async getAll() {
        return prisma.user.findMany()
    }
}