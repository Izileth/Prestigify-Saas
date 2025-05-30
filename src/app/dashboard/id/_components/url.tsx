"use client"

import { Button } from "@/components/ui/button";
import { createUsername } from "../_actions/create-username";
import { useState } from "react";
import Link from "next/link";
import { Link2 } from "lucide-react";

interface UrlPreviewProps {
    username: string | null,

}
export function UrlPreview({username: slug}: UrlPreviewProps) {
    const [error, seterror] = useState<null | string>(null)

    const [username, setUsername] = useState(slug)

    async function submitAction(formData: FormData) {
        const username = formData.get('username') as string   
        if(username =='') return

        const response = await createUsername({username: username})
   
        if( response.error){
            seterror(response.error)
            return
        }

        if(response.data){
            setUsername(response.data)
        }
    }

    if(!!username){
        return(
        <div className="w-full flex flex-col md:flex-row  justify-center p-2 text-zinc-500">
            <div className="w-full flex flex-1 flex-row  p-0 m-0  items-center justify-between bg-zinc-500rounded-md smd:p-4 gap-2">
                <div className="w-full gap-2 flex flex-col md:flex-row p-0 m-0  items-start md:items-center justify-start">
                    <h3 className="font-semibold text-zinc-50">Sua Url:</h3>
                    <Link 
                        href={`/creator/${username}`} 
                        target="_blank"
                        className="w-fit text-sm md:text-md   h-9 rounded-md flex items-center font-medium text-white">
                        {process.env.PUBLIC_HOST_URL || 'http://localhost:3000'}/creator/{username}
                    </Link>   
                </div> 
                <Link
                        href={`/creator/${username}`} 
                        target="_blank"
                        className="bg-zinc-50 text-zinc-950 px-4 py-1"
                    >
                        <Link2 className="h-5 w-5 text-zinc-950" />
                    </Link> 
            </div>
        </div>
        );
    }
    return (
        <div className="w-full">
            <div className="w-full flex items-center justify-center p-2 text-zinc-500">
            <form action={submitAction} className="flex flex-1 flex-col">
            <div className="w-full flex  flex-1 flex-col md:flex-row  items-center justify-between bg-zinc-500rounded-md p-4 gap-2">
                <div className="w-full flex gap-2 flex-row items-center justify-between">
                    <p className="w-fit h-9 rounded-md flex items-center font-semibold text-white">{process.env.PUBLIC_HOST_URL || 'http://localhost:3000'}/creator</p>
                    <input className="w-full placeholder:text-zinc-950 px-2 placeholder:font-normal bg-zinc-50  h-9 rounded-md flex items-center font-semibold text-white" 
                    name="username"
                    type="text" 
                    placeholder="Insira o seu nome..." />
                </div>
            <Button type="submit"
            className="bg-zinc-50 text-zinc-950 hover:bg-zinc-950 hover:text-zinc-50 w-full md:w-fit px-4 h-9 cursor-pointer rounded-md"
            >
                Salvar
            </Button>
            </div>
        </form>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}