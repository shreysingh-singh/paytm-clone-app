"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./routes/config");
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/", user_1.default);
const startServer = async () => {
    try {
        if (!config_1.MONGODB_URI) {
            throw new Error("MongoDb URL is not defined");
        }
        await mongoose_1.default.connect(config_1.MONGODB_URI)
            .then(() => console.log("Database Connected ✅"))
            .catch((err) => console.log(err));
        app.listen(3000, () => {
            console.log("http://localhost:3000");
        });
    }
    catch (e) {
        console.log("Db not connected ❌", e);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map