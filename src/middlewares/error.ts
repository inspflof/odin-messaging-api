import type { Request, Response, NextFunction } from "express";

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    switch(err.name) {
        case "TokenExpiredError":
            return res.status(401).json({ message: "Token expired" })

        case "JsonWebTokenError":
            return res.status(401).json({ message: "Invalid token" })
            
        case "NotBeforeError":
            return res.status(401).json({ message: "Token not active" })
                
        
        default:
            console.error(err)
            return res.status(500).json({
                message: "Internal server error"
            })
    }

}