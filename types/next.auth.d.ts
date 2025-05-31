import {DefaultSession} from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: User & DefaultSession['user' ] 
    }
    interface User {
        id: string;
        name?: string;
        username?: string;
        email?: string;
        image?: string;
        bio?: string;
        createdAt?: string;
        conectStipeAccountId?:string
}
}
