type Env = {
    DATABASE_URL: string;
    PORT: number;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
}

function requireEnv(name: string): string {
    const value = process.env[name]
    if(!value) {
        throw new Error(`Missing env variable: ${name}`)
    }
    return value
}

export const env: Env = {
    DATABASE_URL: requireEnv("DATABASE_URL"),
    PORT: Number(requireEnv("PORT")),
    ACCESS_TOKEN_SECRET: requireEnv("ACCESS_TOKEN_SECRET"),
    REFRESH_TOKEN_SECRET: requireEnv("REFRESH_TOKEN_SECRET"),
}