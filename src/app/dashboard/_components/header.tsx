"use client"

import Link from "next/link"
import {  LogOut, ChartNoAxesColumn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "./menu-mobile"
import { logOut } from "../_actions/logout"

    export function Header() {
    async function handleLogout() {
        await logOut()
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="flex h-16 justify-between items-center w-full px-4 max-w-full mx-auto">
            {/* Logo */}
            <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-1">
                <ChartNoAxesColumn className="h-6 w-6 text-gray-800" />
                <span className="text-lg font-medium text-gray-800 tracking-tight">
                Prestigify
                </span>
            </Link>
            </div>

            {/* Copyright - Desktop */}

            {/* Navigation */}
            <div className="flex items-center justify-between flex-shrink-0">
            <nav className="hidden md:flex items-center gap-6">
                <Link 
                href="/dashboard" 
                className="text-sm font-normal text-gray-600 hover:text-gray-900 transition-colors px-1 border-b border-transparent hover:border-gray-300"
                >
                Dashboard
                </Link>
                <Link 
                href="/dashboard/id" 
                className="text-sm font-normal text-gray-600 hover:text-gray-900 transition-colors px-1 border-b border-transparent hover:border-gray-300"
                >
                Meu perfil
                </Link>

                <div className="h-5 w-px bg-gray-200 mx-2"></div>

                <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 hover:bg-transparent"
                >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Sair</span>
                </Button>
            </nav>

            <MobileMenu />
            </div>
        </div>

        {/* Copyright - Mobile */}
        <div className="md:hidden border-t border-gray-200 py-2">
            <div className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Prestigify Creators - Todos os direitos reservados
            </div>
        </div>
        </header>
    )
}