"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserInfo = void 0;
const zod_1 = __importDefault(require("zod"));
exports.updateUserInfo = zod_1.default.object({
    passwword: zod_1.default.string().optional(),
    firstName: zod_1.default.string().min(3).optional(),
    lastName: zod_1.default.string().min(3).optional()
});
//# sourceMappingURL=zod.js.map