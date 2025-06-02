import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = auth(async function GET(request) {
    if (!request.auth) {
        return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
        );
    }

    try {
        const payments = await prisma.donation.findMany({
        where: {
            userId: request.auth.user?.id,
            status: "PAID",
        },
        orderBy: {
            cratedAt: "desc",
        },
        select: {
            id: true,
            amount: true,
            donorName: true,
            donorMessage: true,
            cratedAt: true,
        },
        });

        return NextResponse.json({ data: payments });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
        { error: "Erro ao buscar os pagamentos" },
        { status: 400 }
        );
    }
});
