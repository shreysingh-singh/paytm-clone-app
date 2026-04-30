"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usermodel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String }
});
exports.Usermodel = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=model.js.map