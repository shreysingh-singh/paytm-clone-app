import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/user";
import accountRouter from "./routes/account"
import mongoose from "mongoose";
import { MONGODB_URI } from "./routes/config";
import "dotenv/config";

const app = express(); 
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("api/v1/account", accountRouter);

const startServer = async () => {
    try {
        if(!MONGODB_URI){
            throw new Error("MongoDb URL is not defined")
        }
        await mongoose.connect(MONGODB_URI)
        .then(() => console.log("Database Connected ✅"))
        .catch((err) => console.log(err));
        app.listen(3000,() => {
            console.log("http://localhost:3000");
        })
        
    } catch (e) {
        console.log("Db not connected ❌", e);
        process.exit(1);
    }
}
startServer();
