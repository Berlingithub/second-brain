import type {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_PASSWORD } from "./config.js"

// extend request type to include userId

declare global {
    namespace Express {
        interface Request {
            userId?: mongoose.Types.ObjectId;
        }
    }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
        const header = req.headers["authorization"];
        if (!header) {
            return res.status(401).json({
                message: "Authorization header missing"
            })
        }
        
        const decoded = jwt.verify(header, JWT_PASSWORD) as {id: string};
        try {
            if (decoded) {
            // req.userId = decoded.id;
              req.userId = new mongoose.Types.ObjectId(decoded.id);
            next();
          } else {
                return res.status(403).json({
                message: "Invalid token/You are not logged in",
            })
        }
        } catch (e) {
            return res.status(403).json({
                message: "Invalid token/You are not logged in "
            })
        }
}; 