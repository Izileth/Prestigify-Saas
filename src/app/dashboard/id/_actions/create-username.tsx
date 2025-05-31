"use server"
import {z} from 'zod'
import { prisma } from '@/lib/prisma'
import {auth} from '@/lib/auth'


const createUsernameSchema = z.object({
    username: z.string().min(4, "O username precisa ter pelo menos 4 letras"),
})

import { createSlug } from '@/utils/create-slug'

type createUsernameFormData = z.infer<typeof createUsernameSchema>
export async function createUsername(data: createUsernameFormData) {

    const session = await auth()

    if (!session?.user) {
        return {
            success: false,
            error: "Usuário não autenticado"
        }
    }

    const schema = createUsernameSchema.safeParse(data)

    if (!schema.success) {
        console.log(schema.error.issues[0].message);
        return {
            success: false,
            error: schema.error.issues[0].message
        }
    }

    try {
        const userId = session.user.id

        const slug = await createSlug(data.username)

        const existSlug = await prisma.user.findFirst({
            where: {
                username: slug
            }
        })

        if(existSlug){
            return {
                success: false,
                error: "Username ja cadastrado"
            }
        }

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                username: slug
            }
        })
        
        return {
            success: true,
            data: slug,
            error: null
        }

        console.log(slug)

    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: "Erro ao criar o username"
        }
    }

    console.log(data.username);
    return {
        data: "User Criado",
        success: true,
        error: null
    }
}