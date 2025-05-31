import { DonationTable } from "./_components/donate";
import { Stats } from "./_components/analytics";
import {auth} from '@/lib/auth'
import { redirect } from "next/navigation";
import { getLoginOnboardingAccount } from "./_data-access/create-onboarding-account";
import { CreateAcountButton } from "./_components/create-account-button";

export default async function Dashboard() {
    const session = await auth();

    if (!session?.user) {
        redirect('/')
    }

    const accountUrl = await getLoginOnboardingAccount(session.user.conectStipeAccountId)

    console.log(accountUrl)
  

    return (
        <div className="p-4">
        <section className="flex items-center justify-between mb-4">
            <div className="w-full flex items-center gap-2 justify-between">
            <h1 className="text-2xl font-semibold">Minha conta</h1>
            <a className="text-sm px-4 py-1 cursor-pointer text-zinc-950 hover:text-zinc-200">Sair</a>
            {accountUrl && (
                <a href={accountUrl} className="text-sm px-4 py-1 cursor-pointer text-zinc-950 hover:text-zinc-200">Configurar Conta</a>
            )}
            </div>
        </section>

        {!session.user.conectStipeAccountId && (
            <CreateAcountButton/>
        )}

        <Stats />


        <h2 className="text-2xl font-semibold mb-2">Últimas doações</h2>
        <DonationTable />
        </div>
    );
}