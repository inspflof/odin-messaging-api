import type { MockContext, Context } from "../../config/prisma.mock.js";
import { Prisma } from "../../generated/prisma/client.js";
import { createMockContext } from "../../config/prisma.mock.js";
import { conversationQueries } from "./conversation.js";
import { mockDeep } from "jest-mock-extended";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context
})

type ConversationGet = Prisma.ConversationGetPayload<{
    include: {
        users: {
            include: {
                user: true
            }
        }
    }
}>

test("should return all the conversations", async () => { 
    const conversations: ConversationGet[] = [
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
    const conversation: ConversationGet = {
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

type ConversationCreate = Prisma.ConversationGetPayload<{}>

test("should create conversation and link all its users", async () => {
    const txMock = mockDeep<Prisma.TransactionClient>()

    mockCtx.prisma.$transaction.mockImplementation(async (callback) => {
        return await callback(txMock)
    })

    const users = ["1", "2"]
    const conversation: ConversationCreate = {
        createdAt: new Date,
        updatedAt: new Date,
        id: "1",
        name: "John",
        type: "DIRECT",
    }

    txMock.conversation.create.mockResolvedValue(conversation)
    txMock.conversationUser.createMany.mockResolvedValue({ count: 2 })

    const result = await conversationQueries.create(
        "DIRECT",
        "John",
        users,
        ctx
    )

    expect(result).toEqual(conversation)

    expect(txMock.conversation.create).toHaveBeenCalledWith({
        data: {
            type: "DIRECT",
            name: "John"
        }
    })

    expect(txMock.conversationUser.createMany).toHaveBeenCalledWith({
        data: [
            { userId: "1", conversationId: "1" },
            { userId: "2", conversationId: "1" }
        ]
    })

    expect(mockCtx.prisma.conversation.create).not.toHaveBeenCalled()
})

test("should add users to a conversation", async () => {
  const txMock = mockDeep<Prisma.TransactionClient>();

  mockCtx.prisma.$transaction.mockImplementation(async (callback) => {
    return await callback(txMock);
  });

  const inputUserIds = ["user_2", "user_3"];
  const conversationId = "conv_123";

  const dbUsersResponseMock = [
    { user: { id: "user_1", username: "alice", displayName: "Alice" } },
    { user: { id: "user_2", username: "bob", displayName: "Bob" } },
    { user: { id: "user_3", username: "charlie", displayName: "Charlie" } }
  ];

  txMock.conversationUser.createMany.mockResolvedValue({ count: 2 });
  txMock.conversationUser.findMany.mockResolvedValue(dbUsersResponseMock as any);

  const result = await conversationQueries.addUsers(inputUserIds, conversationId, ctx);

  expect(result).toEqual([
    { id: "user_1", username: "alice", displayName: "Alice" },
    { id: "user_2", username: "bob", displayName: "Bob" },
    { id: "user_3", username: "charlie", displayName: "Charlie" }
  ]);

  expect(txMock.conversationUser.createMany).toHaveBeenCalledWith({
    data: [
      { conversationId: "conv_123", userId: "user_2" },
      { conversationId: "conv_123", userId: "user_3" }
    ],
    skipDuplicates: true
  });

  expect(txMock.conversationUser.findMany).toHaveBeenCalledWith(
    expect.objectContaining({
      where: { conversationId: "conv_123" }
    })
  );
});

test("should remove users from a conversation", async () => {
  const txMock = mockDeep<Prisma.TransactionClient>();

  mockCtx.prisma.$transaction.mockImplementation(async (callback) => {
    return await callback(txMock);
  });

  const userIdsToRemove = ["user_2"];
  const conversationId = "conv_123";

  const dbRemainingUsersMock = [
    { user: { id: "user_1", username: "alice", displayName: "Alice" } }
  ];

  txMock.conversationUser.deleteMany.mockResolvedValue({ count: 1 });
  txMock.conversationUser.findMany.mockResolvedValue(dbRemainingUsersMock as any);

  const result = await conversationQueries.removeUsers(userIdsToRemove, conversationId, ctx);

  expect(result).toEqual([
    { id: "user_1", username: "alice", displayName: "Alice" }
  ]);

  expect(txMock.conversationUser.deleteMany).toHaveBeenCalledWith({
    where: {
      conversationId: "conv_123",
      userId: {
        in: ["user_2"]
      }
    }
  });

  expect(txMock.conversationUser.findMany).toHaveBeenCalledWith(
    expect.objectContaining({
      where: { conversationId: "conv_123" }
    })
  );
});