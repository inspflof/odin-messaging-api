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