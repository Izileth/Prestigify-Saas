"use client"

import { Button } from "@/components/ui/button";
import { createUsername } from "../_actions/create-username";
import { useState } from "react";
import Link from "next/link";
import { Link2 } from "lucide-react";

interface UrlPreviewProps {
  username: string | null;
}

export function UrlPreview({ username: slug }: UrlPreviewProps) {
    const [error, setError] = useState<null | string>(null);
    const [username, setUsername] = useState(slug);

    async function submitAction(formData: FormData) {
        const username = formData.get('username') as string;
        if (username == '') return;

        const response = await createUsername({ username });
        
        if (response.error) {
        setError(response.error);
        return;
        }

        if (response.data) {
        setUsername(response.data);
        }
    }

    if (!!username) {
        return (
        <div className="w-full p-3 border border-gray-200 rounded-none mb-4">
            <div className="flex flex-row md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Sua URL:</h3>
                <div className="flex items-center gap-2">
                <Link 
                    href={`/creator/${username}`} 
                    target="_blank"
                    className="text-sm font-normal text-gray underline-offset-2 hover:underline truncate"
                >
                    {process.env.PUBLIC_HOST_URL || 'http://localhost:3000'}/creator/{username}
                </Link>
                </div>
            </div>
            <Link
                href={`/creator/${username}`} 
                target="_blank"
                className="p-2 border border-gray-200 rounded-none hover:bg-gray-50"
            >
                <Link2 className="h-4 w-4 text-gray-600" />
            </Link>
            </div>
        </div>
        );
    }
        
    return (
        <div className="w-full border border-gray-200 rounded-none p-3 mb-4">
        <form action={submitAction} className="space-y-3">
            <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Criar URL:</label>
            <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 p-1">
                <span className="text-sm text-gray-600 px-2">
                    {process.env.PUBLIC_HOST_URL || 'http://localhost:3000'}/creator/
                </span>
                <input
                    name="username"
                    type="text"
                    placeholder="seu-nome"
                    className="flex-1 text-sm bg-transparent outline-none px-2 py-1.5"
                />
                </div>
                <Button 
                type="submit"
                className="w-full md:w-auto border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white rounded-none"
                >
                Salvar
                </Button>
            </div>
            </div>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </form>
        </div>
    );
}