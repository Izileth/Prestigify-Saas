import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";


export async function POST(req: NextRequest) {
    const slg = req.headers.get("stripe-signature")!;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET! as string;

    let event: Stripe.Event;

    try {
        const payload = await req.text();
        event = stripe.webhooks.constructEvent(payload, slg, endpointSecret);
    } catch (error) {
        console.log(error, "Falha ao Autnenticar o Webhook");
        return new NextResponse("WebHook error, Request", { status: 400 });
    }

    switch (event.type) {
        case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;

        const paymentIntentId = session.payment_intent as string;

        const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
        );
        console.log(
            paymentIntent,
            "!! Pagamento recuperado e indentificação concluida com sucesso !!"
        );

        const donorName = paymentIntent.metadata.donorName;
        const donorMessage = paymentIntent.metadata.donorMessage;
        const donateId = paymentIntent.metadata.donateId;

        try {
            const updateDonation = await prisma.donation.update({
            where: {
                id: donateId,
            },
            data: {
                status: "PAID",
                donorName: donorName ?? "Usuário, Sem mensagen...",
                donorMessage: donorMessage ?? "Sem mensagem...",
            },
            });

            console.log(updateDonation, "Pagamento atualizado com sucesso");
        } catch (error) {
            console.log(error, "Erro ao criar o pagamento");
            return new NextResponse("WebHook error, Request", { status: 400 });
        }

        break;
        default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    return NextResponse.json('OK, Sucesso!', { status: 200 });


}
