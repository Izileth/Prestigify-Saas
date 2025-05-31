"use server"

import { prisma } from "@/lib/prisma"
import {z} from 'zod'

const creatUserSchema = z.object({
    username: z.string().min(4, "O username precisa ter pelo menos 4 letras"),
})
type CreateUserSchema = z.infer<typeof creatUserSchema>
export async function getInfoUser(data: CreateUserSchema){
    
    const schema = creatUserSchema.safeParse(data);
    if(!schema.success) {
        return null
    }

    try{
        const user = await prisma.user.findUnique({
            where: {
                username: data.username
            },
        })
        return user;
        
    }catch(err){
        console.log(err);
        return null
    }

}