"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const model_1 = require("./db/model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
require("dotenv/config");
const authmiddleware_1 = require("../middlewwre/authmiddleware");
const zod_1 = require("./zod");
const router = (0, express_1.Router)();
router.post("/signup", async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        if (!email || !password || !firstName || !lastName) {
            return res.status(403).json({
                msg: `Your Details are required`,
            });
        }
        const emailCheck = await model_1.Usermodel.findOne({
            email,
        });
        if (emailCheck) {
            return res.status(403).json({
                msg: `Email already exist`,
            });
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const createdUser = await model_1.Usermodel.create({
            email,
            password: hashPassword,
            firstName,
            lastName,
        });
        // Create a new account linked to the created user
        const createdAccount = await model_1.Accountmodel.create({
            userId: createdUser._id,
            balance: Math.floor(1 + Math.random() * 10000),
        });
        console.log("Created account:", createdAccount);
        res.status(201).json({
            msg: `Signup successful`,
            userId: createdUser._id,
            account: { _id: createdAccount._id, balance: createdAccount.balance },
        });
    }
    catch (e) {
        res.status(500).json({ msg: `Server issue`, error: e });
    }
});
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(403).json({ msg: `Email and password require` });
    }
    try {
        const existingUser = await model_1.Usermodel.findOne({ email });
        if (!existingUser) {
            return res.status(403).json({
                msg: `Invalid credentials`,
            });
        }
        const isMatch = await bcrypt_1.default.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(403).json({
                msg: `Incorrect Password `,
            });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ id: existingUser._id.toString() }, config_1.JWT_Secret, {
                expiresIn: "1h",
            });
            return res.status(201).json({
                msg: `Successful signin`,
                token,
            });
        }
    }
    catch (e) {
        return res.status(500).json({ msg: `Server error`, e });
    }
});
router.put("/update", authmiddleware_1.authMiddleware, async (req, res) => {
    const { success } = zod_1.updateUserInfo.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: `Error while updating Info`,
        });
    }
    try {
        //@ts-ignore
        await model_1.Usermodel.updateOne({ _id: req.userId }, req.body);
        res.status(201).json({
            msg: `Updated successfuly`,
        });
    }
    catch (e) {
        return res.status(500).json({
            msg: `Server Error`,
        });
    }
});
router.get("/bulk", authmiddleware_1.authMiddleware, async (req, res) => {
    const filter = req.body.filter || "";
    try {
        const user = await model_1.Usermodel.find({
            $or: [
                {
                    firstName: {
                        $regex: filter,
                        $options: "i",
                    },
                },
                {
                    lastName: {
                        $regex: filter,
                        $options: "i",
                    },
                },
            ],
        });
        res.status(201).json({
            user: user.map((user) => ({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id,
            })),
        });
    }
    catch (e) {
        return res.status(500).json({
            msg: `Server Error`,
        });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map