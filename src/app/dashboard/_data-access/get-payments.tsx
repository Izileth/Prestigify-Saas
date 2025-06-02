"use server"

import { prisma } from "@/lib/prisma"
export async function getPayments(userId: string) {

    if(!userId){
        return {
            data: [],
        }
    }
    try {
        const payments = await prisma.donation.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                cratedAt: 'desc'
            },
            select: {
                id: true,
                amount: true,
                donorName: true,
                donorMessage: true,
                cratedAt: true,
            }
        })

        return { data: payments, error: null }

    } catch (error) {
        console.log(error);
        return { data: [] }
    }
}