"use server"

import { prisma } from "@/lib/prisma"
import {z} from "zod"

import { stripe } from "@/lib/stripe"

const createUsernameSchema = z.object({
    slug: z.string().min(1, "O username precisa ter pelo menos 1 letra"),
    name: z.string().min(1, "O username precisa ter pelo menos 1 letra"),
    message: z.string().min(5, "A mensagem precisa ter pelo menos 5 letras"),
    price: z.number().min(10, "O valor precisa ser maior que 10"),
    creatorId: z.string(),
})

type CreatePaymentSchema = z.infer<typeof createUsernameSchema>

export async function  createPayment(data: CreatePaymentSchema){
    const schema = createUsernameSchema.safeParse(data)

    if (!schema.success) {
        return{
            data: null,
            error: schema.error.issues[0].message
        }
    }

    if(!data.creatorId){
        return{
            data: null,
            error: 'Criador Não Econquentrado'
        }
    }

    try{
        const creator = await prisma.user.findFirst(
            {
                where: {
                    conectStipeAccountId: data.creatorId
                }
            }
        )

        if(!creator){
            return{
                data: null,
                error: 'Erro ao procurar o criador'
            }
        }

        const applicationFeeAmount = Math.floor(data.price * 0.1)

        const donation = await prisma.donation.create({
            data: {
                donorName: data.name,
                donorMessage: data.message,
                userId: creator.id,
                status: "PENDING",
                amount: (data.price - applicationFeeAmount)
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_HOST_URL}/creator/${data.slug}`,
            cancel_url: `${process.env.NEXT_PUBLIC_HOST_URL}/creator/${data.slug}`,
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: "Apoiar" + creator.name,
                        },
                        unit_amount: data.price,
                    },
                    quantity: 1,
                },
            ],
            payment_intent_data: {
                application_fee_amount: applicationFeeAmount,
                transfer_data: {
                    destination: creator.conectStipeAccountId as string
                },
                metadata: {
                    donorName: data.name,
                    donorMeessage: data.message,
                    donationId: donation.id
                }
            },
        })

        return{
            data: JSON.stringify(session),
            error: null
        }

    }catch(err){
        console.log(err)
        return{
            data: null,
            error: 'Erro ao criar o pagamento'
        }
    }

}