import type { MockContext, Context } from "../../config/prisma.mock.js";
import { Prisma } from "../../generated/prisma/client.js";
import { createMockContext } from "../../config/prisma.mock.js";
import { conversationQueries } from "./conversation.js";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context
})

type Conversation = Prisma.ConversationGetPayload<{
    include: {
        users: {
            include: {
                user: true
            }
        }
    }
}>

test("should return all the conversations", async () => { 
    const conversations: Conversation[] = [
        {
            id: "1",
            createdAt: new Date,
            updatedAt: new Date,
            name: null,
            type: "DIRECT",
            users: [
                {
                    conversationId: "1",
                    lastReadMessageId: "1",
                    userId: "1",
                    user: {
                        createdAt: new Date,
                        id: "1",
                        displayName: "John",
                        username: "johndoe"
                    }
                },
                {
                    conversationId: "1",
                    lastReadMessageId: "1",
                    userId: "2",
                    user: {
                        createdAt: new Date,
                        id: "2",
                        displayName: "Jane",
                        username: "janedoe"
                    }
                },
            ]
        }
    ]

    mockCtx.prisma.conversation.findMany.mockResolvedValue(conversations)

    await expect(conversationQueries.getAll(ctx)).resolves.toEqual([
        {
            id: "1",
            createdAt: conversations[0]?.createdAt,
            updatedAt: conversations[0]?.updatedAt,
            name: null,
            type: "DIRECT",
            users: [
                {
                    createdAt: conversations[0]?.users[0]?.user.createdAt,
                    id: "1",
                    displayName: "John",
                    username: "johndoe",
                    lastReadMessageId: "1",
                },
                {
                    createdAt: conversations[0]?.users[1]?.user.createdAt,
                    id: "2",
                    displayName: "Jane",
                    username: "janedoe",
                    lastReadMessageId: "1",
                },
            ]
        }
    ])
})

test("should return conversation with id = 1", async () => {
    const conversation: Conversation = {
        id: "1",
        createdAt: new Date,
        updatedAt: new Date,
        name: null,
        type: "DIRECT",
        users: [
            {
                conversationId: "1",
                lastReadMessageId: "1",
                userId: "1",
                user: {
                    createdAt: new Date,
                    id: "1",
                    displayName: "John",
                    username: "johndoe"
                }
            },
            {
                conversationId: "1",
                lastReadMessageId: "1",
                userId: "2",
                user: {
                    createdAt: new Date,
                    id: "2",
                    displayName: "Jane",
                    username: "janedoe"
                }
            },
        ]
    }

    mockCtx.prisma.conversation.findUnique.mockResolvedValue(conversation)

    await expect(conversationQueries.getById("1", ctx)).resolves.toEqual({
        id: "1",
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        name: null,
        type: "DIRECT",
        users: [
            {
                createdAt: conversation.users[0]?.user.createdAt,
                id: "1",
                displayName: "John",
                username: "johndoe",
                lastReadMessageId: "1"
            },
            {
                createdAt: conversation.users[1]?.user.createdAt,
                id: "2",
                displayName: "Jane",
                username: "janedoe",
                lastReadMessageId: "1"
            },
        ]
    })
})