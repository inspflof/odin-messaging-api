import type { ConversationType } from "../generated/prisma/enums.js";

export type CreateConversationBody = {
    name?: string;
    type: ConversationType;
    userIds: string[];
}

export type GetByIdConversationParams = {
    conversationId: string;
}

export type GetUserConversationParams = {
    conversationId: string;
}

export type AddUserConversationParams = {
    conversationId: string;
}

export type AddUserConversationBody = {
    userIds: string[];
}