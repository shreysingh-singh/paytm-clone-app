"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const model_1 = require("./db/model");
const authmiddleware_1 = require("../middlewwre/authmiddleware");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
router.get("/balance", authmiddleware_1.authMiddleware, async (req, res) => {
    try {
        const account = await model_1.Accountmodel.findOne({
            //@ts-ignore
            userId: req.userId,
        });
        if (!account) {
            return res.status(404).json({
                msg: `Account not found`
            });
        }
        res.json({
            balance: account.balance,
        });
    }
    catch (e) {
        return res.status(500).json({
            msg: `Server Error`
        });
    }
});
router.post("/transfer", authmiddleware_1.authMiddleware, async (req, res) => {
    const session = await mongoose_1.default.startSession();
    try {
        const { amount, to } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ msg: "Invalid amount" });
        }
        //@ts-ignore
        if (to === req.userId) {
            return res.status(400).json({ msg: "Cannot transfer to yourself" });
        }
        session.startTransaction();
        const account = await model_1.Accountmodel.findOne({
            //@ts-ignore
            userId: req.userId,
        }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                msg: `Insufficent balance`,
            });
        }
        const toAccount = await model_1.Accountmodel.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                msg: `Invalid account`,
            });
        }
        await model_1.Accountmodel.updateOne(
        //@ts-ignore
        { userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await model_1.Accountmodel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
        await session.commitTransaction();
        res.status(201).json({
            msg: `Transaction successful`,
        });
    }
    catch (e) {
        return res.status(500).json({
            msg: `Server Error`
        });
    }
    finally {
        session.endSession();
    }
});
exports.default = router;
//# sourceMappingURL=account.js.map