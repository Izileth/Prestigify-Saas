import { DonationTable } from "./_components/donate";
import { Stats } from "./_components/analytics";
import {auth} from '@/lib/auth'
import { redirect } from "next/navigation";
import { Header } from "./_components/header";
import { CreateAcountButton } from "./_components/create-account-button";

import { getStripeDashboard } from "./_actions/get-stripe-dashboard";
export default async function Dashboard() {
    const session = await auth();

    if (!session?.user) {
        redirect('/')
    }


    const urlPaymentDashboard = await getStripeDashboard(session.user?.conectStipeAccountId)
   // const payments = await getPayments(session.user.id)

    //console.log(payments);

    return (
        <div className="p-4">
        <div className="mb-4">
            <Header /></div>    
        <section className="flex items-center justify-between mb-4">
            <div className="w-full flex items-center gap-2 justify-between">
            {urlPaymentDashboard && (
                <a href={urlPaymentDashboard} target="_blank" className="text-sm px-4 py-1 cursor-pointer text-zinc-950 hover:text-zinc-800 hover:underline">Configurar Conta</a>
            )}
            </div>
        </section>

        {!session.user.conectStipeAccountId && (
            <CreateAcountButton/>
        )}

        <Stats  userId={session.user.id} stripeAccountId={session.user.conectStipeAccountId ?? ""} />
   

        <div className="flex flex-col justify-center items-start px-0.5">
            <h2 className="text-2xl font-normal mb-2">Últimas doações</h2>
            <div className="flex items-center gap-2">
                <span className="text-zinc-500 text-sm">Nenhuma doação encontrada</span>
            </div>
        </div>

        {!session.user.conectStipeAccountId && (
            <DonationTable  />
        )}

        </div>
    );
}