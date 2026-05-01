import zod from "zod";


export const  updateUserInfo = zod.object({
    passwword: zod.string().optional(),
    firstName: zod.string().min(3).optional(),
    lastName: zod.string().min(3).optional()
});