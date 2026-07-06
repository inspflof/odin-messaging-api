export type CreateUserBody = {
    username: string;
    displayName: string;
    password: string;
}

export type EditUserBody = {
    username: string;
    displayName: string;
}