import type { TokenPayload } from "../controllers/auth.type.ts";

type AuthenticatedUser = {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser
        }
    }
}