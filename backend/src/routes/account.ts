
import { Router  , Request , Response } from "express";
import { Accountmodel } from "./db/model";
import { authMiddleware } from "../middlewwre/authmiddleware";
import mongoose from "mongoose";

const router = Router();


router.get("/balance", authMiddleware, async(req: Request, res: Response) => {
    try {
        const account = await Accountmodel.findOne({
          //@ts-ignore
          userId: req.userId,
        });
        if(!account){
            return res.status(404).json({
                msg:`Account not found`
            })
        }

        res.json({
          balance: account.balance,
        });
    } catch (e) {
        return res.status(500).json({
            msg:`Server Error`
        });
    }
});

router.post("/transfer", authMiddleware, async(req: Request, res: Response) => {
    const session = await mongoose.startSession();

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
        
        const account = await Accountmodel.findOne({
          //@ts-ignore
          userId: req.userId,
        }).session(session);

        if (!account || account.balance < amount) {
          await session.abortTransaction();
          return res.status(400).json({
            msg: `Insufficent balance`,
          });
        }

        const toAccount = await Accountmodel.findOne({ userId: to }).session(
          session,
        );
        if (!toAccount) {
          await session.abortTransaction();
          return res.status(400).json({
            msg: `Invalid account`,
          });
        }
        
        await Accountmodel.updateOne(
            //@ts-ignore
          { userId: req.userId },
          { $inc: { balance: -amount } },
        ).session(session);
        await Accountmodel.updateOne(
          { userId: to },
          { $inc: { balance: amount } },
        ).session(session);

        await session.commitTransaction();
        res.status(201).json({
          msg: `Transaction successful`,
        });
    } catch (e) {
        return res.status(500).json({
            msg: `Server Error`
        });
    } finally {
        session.endSession();
    }
})

export default router