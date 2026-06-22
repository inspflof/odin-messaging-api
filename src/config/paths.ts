export const PATHS = {
    USER: "/user",
    CONVERSATION: "/conversation"
}

export const USER_PATHS = {
    GET_ALL: "/",
    CREATE: "/"
}

export const CONVERSATION_PATHS = {
    GET_ALL: "/",
    CREATE: "/",
    GET_BY_ID: "/:conversationId",
    USERS: {
        GET: "/:conversationId/user",
        ADD: "/:conversationId/user",
        REMOVE: "/:conversationId/user",
    },
    MESSAGES: {
        GET: "/:conversationId/message",
        CREATE: "/:conversationId/message"
    }
}