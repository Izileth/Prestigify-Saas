import {NextResponse} from 'next/server'
import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export const POST = auth(async function POST(request){
    if(!request.auth){
        return NextResponse.json({error: 'Usuário não autenticado'}, {status: 401})
    }

    try{
        const account = await stripe.accounts.create({
            controller: {
                losses:{
                    payments: 'application'
                },
                fees:{
                    payer: 'application'
                },
                stripe_dashboard:{
                    type: 'express'
                }
            }
        })

        if(!account.id){
            return NextResponse.json({error: 'Erro ao criar a conta de pagamento'}, {status: 500})
        }

        await prisma.user.update({
            where: {
                id: request.auth.user.id
            },
            data: {
                conectStipeAccountId: account.id
            }
        })

        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `${process.env.NEXT_PUBLIC_HOST_URL!}/dashboard`,
            return_url:  `${process.env.NEXT_PUBLIC_HOST_URL!}/dashboard`,
            type: 'account_onboarding'
        })

        return NextResponse.json({url: accountLink?.url}, {status: 200})

    }catch(err){
        console.log(err)
        return NextResponse.json({error: 'Erro ao criar a conta'}, {status: 500})
    }
})