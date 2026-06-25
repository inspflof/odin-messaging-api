import { PrismaClient } from "../generated/prisma/client.js";
import { prisma } from "./prisma.js";

export type Context = {
    prisma: PrismaClient;
}

export const ctx: Context = {
    prisma: prisma,
}