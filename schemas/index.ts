import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
    .refine((data)=>{
        if(data.password && !data.newPassword){
            return false;
        }
        return true;
    },{
        message: "New password is required!",
        path:["newPassword"]
    })
    .refine((data)=>{
        if(!data.password && data.newPassword){
            return false;
        }
        return true;
    },{
        message: "password is required!",
        path:["password"]
    })

export const NewPasswordSchema =z.object({
    password: z.string().min(6,{
        message:"Minimum of 6 characters required"
    })
})
export const ResetSchema =z.object({
    email: z.string().email({
        message:"email is required"
    })
})
export const LoginSchema =z.object({
    email: z.string().email({
        message:"email is required"
    }),
    password: z.string().min(1,{
        message:"password is required"
    }),
    code: z.string().optional(),
})
export const RegisterSchema =z.object({
    email: z.string().email({
        message:"email is required"
    }),
    password: z.string().min(6,{
        message:"Minimum 6 characters required"
    }),
    name: z.string().min(1,{
        message:"name is required"
    })
})