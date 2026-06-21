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
    GET_USERS: "/:conversationId/user",
    ADD_USER: "/:conversationId/user",
    REMOVE_USER: "/:conversationId/user"
}