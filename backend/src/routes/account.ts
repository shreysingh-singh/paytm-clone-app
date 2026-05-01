
import { Router  , Request , Response } from "express";
import { Accountmodel } from "./db/model";
import { authMiddleware } from "../middlewwre/authmiddleware";

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
})

export default router