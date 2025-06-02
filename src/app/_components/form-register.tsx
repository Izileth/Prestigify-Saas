"use server"
import { signIn } from "@/lib/auth"
export async function handleRegister(){
    console.log("Register action triggered")
    await signIn('github', {redirectTo: '/dashboard'})
}