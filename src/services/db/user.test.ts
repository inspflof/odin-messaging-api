import type { MockContext, Context } from "../../config/prisma.mock.js";
import { createMockContext } from "../../config/prisma.mock.js";
import { userQueries } from "./user.js";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context
})

test("should return all users", async () => {
    const users = [
        {
            createdAt: new Date,
            id: "1",
            displayName: "John",
            username: "johndoe"
        },
        {
            createdAt: new Date,
            id: "2",
            displayName: "Jane",
            username: "janedoe"
        }
    ]
    mockCtx.prisma.user.findMany.mockResolvedValue(users)

    await expect(userQueries.getAll(ctx)).resolves.toEqual(users)
})