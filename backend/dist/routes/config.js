"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_Secret = exports.MONGODB_URI = void 0;
require("dotenv/config");
const mongoUri = process.env.mongoDb_Url;
if (!mongoUri) {
    throw new Error("Environment variable mongoDb_Url is not defined");
}
exports.MONGODB_URI = mongoUri;
const jwtSecret = process.env.JWT_Secret;
if (!jwtSecret) {
    throw new Error("Environment variable JWT_Secret is not defined");
}
exports.JWT_Secret = jwtSecret;
//# sourceMappingURL=config.js.map