"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../routes/config");
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            msg: `Authorization required`,
        });
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_Secret);
        req.userId = decoded.id;
        next();
    }
    catch (e) {
        return res.status(500).json({
            msg: `Server error`
        });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authmiddleware.js.map