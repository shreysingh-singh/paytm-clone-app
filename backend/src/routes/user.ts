import { Router , Request , Response } from "express"
import { Usermodel } from "./db/model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_Secret } from "./config";
import "dotenv/config";
import { authMiddleware } from "../middlewwre/authmiddleware";
import { updateUserInfo } from "./zod";

const router = Router();

router.post("/signup", async(req: Request , res: Response) => {
   try {
     const { email , password , firstName , lastName } = req.body;
     if (!email || !password || !firstName || !lastName) {
       return res.status(403).json({
         msg: `Your Details are required`,
       });
     }
     const emailCheck = await Usermodel.findOne({
        email
     });
     if(emailCheck) {
        return res.status(403).json({
            msg:`Email already exist`
        });
     }
     const hashPassword = await bcrypt.hash(password, 10);
     await Usermodel.create({
        email,
        password: hashPassword,
        firstName,
        lastName
     })
     res.status(201).json({
       msg: `Signin sucessfull`,
     });
   } catch (e) {
    res.status(500).json({msg: `Server issue`, error: e});
   }
});
router.post("/signin", async (req: Request , res: Response) => {
    const { email , password } = req.body;
    if(!email || !password ){
        return res.status(403).json({msg:`Email and password require`});
    }
    try {
        const existingUser = await Usermodel.findOne({ email });
        if(!existingUser){
            return res.status(403).json({
              msg: `Invalid credentials`
            }); 
        }
        const isMatch = await bcrypt.compare(password , existingUser.password as string)
        if(!isMatch){
            return res.status(403).json({
                msg:`Incorrect Password `
            });
        }else{
            const token = jwt.sign({id: existingUser._id.toString()}, JWT_Secret, {expiresIn: '1h'});
            return res.status(201).json({
                msg:`Successful signin`, token
            });
        }
    } catch (e) {
        return res.status(500).json({msg:`Server error`, e});
    }
});
router.put("/update", authMiddleware, async(req: Request , res: Response) => {
    const { success } =  updateUserInfo.safeParse(req.body)

    if(!success){
        return res.status(400).json({
            msg:`Error while updating Info`
        });
    }
    try {
      //@ts-ignore
      await Usermodel.updateOne({ _id: req.userId }, req.body);

      res.status(201).json({
        msg: `Updated successfuly`,
      });
    } catch (e) {
        return res.status(500).json({
            msg:`Server Error`
        });
    }
});


export default router