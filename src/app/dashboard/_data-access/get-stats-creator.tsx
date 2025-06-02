"use server"

import { prisma } from "@/lib/prisma"
import {stripe} from '@/lib/stripe'

export async function getStatsUser(userId: string, stripeAccountId: string) {
    if(!userId) {
        return {
            data: null,
            error: 'Usuário não autenticado'
        }
    }
    try {
        const totalDonations = await prisma.donation.count({
            where: {
                userId: userId,
                status: 'PAID'
            }
        })
        
        const totalDonationsAmount = await prisma.donation.aggregate({
            where:{
                userId: userId,
                status: 'PAID'
            },
            _sum: {
                amount: true
            }
        })

        const balance = await stripe.balance.retrieve({
            stripeAccount: stripeAccountId,
        })

        return {
            totalDonations: totalDonations ?? 0,
            totalDonationsValueFormatted: totalDonationsAmount._sum.amount ?? 0,
            balance: balance?.pending[0]?.amount ?? 0,
        }


    } catch (error) {
        console.log(error)
        return {
            error: 'Erro ao buscar os dados do usuário'
        }
    }

}