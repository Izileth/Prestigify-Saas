"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, LogOut, ChartNoAxesColumn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { logOut } from "../_actions/logout"

export function MobileMenu() {
    const [open, setOpen] = useState(false)


    async function handleLogout() {
        await logOut()
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
            <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-600 hover:text-gray-900 hover:bg-transparent"
            >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu</span>
            </Button>
        </SheetTrigger>
        
        <SheetContent 
            side="right" 
            className="w-[240px] sm:w-[300px] p-0 border-l border-gray-200 bg-white"
        >
            <div className="border-b border-gray-200 px-5 py-6 flex items-center">
                <span className="text-lg font-medium text-gray-800 tracking-tight flex items-center flex-row justify-between">
                    <ChartNoAxesColumn className="h-6 w-6 text-gray-800" /> Prestigify
                </span>
            </div>

            <div className="flex flex-col py-2">
            <Link
                href="/dashboard"
                className="px-5 py-3 text-sm font-normal text-gray-600 border-b border-gray-100 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                onClick={() => setOpen(false)}
            >
                Dashboard
            </Link>
            <Link
                href="/dashboard/id"
                className="px-5 py-3 text-sm font-normal text-gray-600 border-b border-gray-100 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                onClick={() => setOpen(false)}
            >
                Meu perfil
            </Link>
            </div>

            <div className="absolute bottom-0 w-full border-t border-gray-200">
            <Button
                variant="ghost"
                className="w-full justify-start h-12 rounded-none text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-5"
                onClick={handleLogout}
            >
                <LogOut className="mr-3 h-4 w-4" />
                <span className="text-sm font-normal">Sair</span>
            </Button>
            </div>
        </SheetContent>
        </Sheet>
    )
}