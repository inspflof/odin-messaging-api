export const PATHS = {
    USER: "/user",
    AUTH: "/auth",
    CONVERSATION: "/conversation",
    MESSAGE: "/conversation/:conversationId/message"
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
}

export const MESSAGE_PATHS = {
    GET: "/",
    CREATE: "/",
    GET_BY_ID: "/:messageId",
    DELETE: "/:messageId",
}

export const AUTH_PATHS = {
    LOGIN: "/",
    LOGOUT: "/logout",
    REFRESH: "/refresh",
    ME: "/me"
}