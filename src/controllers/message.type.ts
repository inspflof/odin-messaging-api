export type GetMessagesParams = {
    conversationId: string;
}

export type CreateMessagesParams = {
    conversationId: string;
}

export type CreateMessagesBody = {
    contents: string[];
    userId: string;
}