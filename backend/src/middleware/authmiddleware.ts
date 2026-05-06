import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_Secret } from "../routes/config";


export const authMiddleware = async(req: any , res: any , next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({
          msg: `Authorization required`,
        });
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_Secret) as { id: String};

        req.userId = decoded.id;
        next()
    } catch (e) {
        return res.status(500).json({
            msg:`Server error`
        })
    }
}