export type LoginAuthBody = {
    username: string;
    password: string;
}

export type TokenPayload = {
    id: string;
    iat: number;
    exp: number;
}