"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const model_1 = require("./db/model");
const authmiddleware_1 = require("../middlewwre/authmiddleware");
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
exports.default = router;
//# sourceMappingURL=account.js.map