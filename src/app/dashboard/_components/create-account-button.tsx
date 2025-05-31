"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
export  function CreateAcountButton() {
    const [loading, setLoading] = useState(false)

    async function handleCreateAcount() {
        setLoading(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/stripe/create-account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            if(!response.ok){
                toast.error('Erro ao criar a conta de pagamento')
                setLoading(false)
                return;
            }

            window.location.href = data.url

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className="mb-5 mt-2">
            <Button onClick={handleCreateAcount} disabled={loading} className="cursor-pointer">{loading ? "Carregando..." : "Ativar Conta De Pagamentos"}</Button>
        </div>
    )
}
