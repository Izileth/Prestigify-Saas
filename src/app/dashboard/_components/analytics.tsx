import { Users, DollarSign, Wallet } from "lucide-react";
import { StatCard } from "./stats-card";
import { getStatsUser } from "../_data-access/get-stats-creator";
import { formatCurrency } from "@/utils/format-current";

export async function Stats({userId, stripeAccountId}: {userId: string, stripeAccountId: string}) {
    const stats = await getStatsUser(userId, stripeAccountId)
    const { totalDonations, balance, totalDonationsValueFormatted } = stats

    return (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-3 mb-6">
        <StatCard
            title="Apoiadores"
            description="Total de apoiadores"
            icon={<Users className="w-5 h-5 text-gray-600" />}
            value={totalDonations ?? 0}
        />

        <StatCard
            title="Total recebido"
            description="Quantidade total recebida"
            icon={<DollarSign className="w-5 h-5 text-gray-600" />}
            value={formatCurrency((totalDonationsValueFormatted ?? 0) / 100)}
        />

        <StatCard
            title="Saldo em conta"
            description="Saldo pendente"
            icon={<Wallet className="w-5 h-5 text-gray-600" />}
            value={formatCurrency((balance ?? 0) / 100)}
        />
        </div>
    );
}