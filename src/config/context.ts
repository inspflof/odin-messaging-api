import { PrismaClient } from "@prisma/client/extension";
import { prisma } from "./prisma.js";

export type Context = {
    prisma: PrismaClient;
}

export const ctx: Context = {
    prisma: prisma,
}