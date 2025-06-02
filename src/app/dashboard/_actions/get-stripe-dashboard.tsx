"use server"

import { stripe } from "@/lib/stripe"

export async function getStripeDashboard(accountId: string | undefined) {

    if(!accountId){
        return null
    }
    try{
        const loginLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: `${process.env.HOST_URL!}/dashboard`,
            return_url:  `${process.env.HOST_URL!}/dashboard`,
            type: 'account_onboarding'
        })

        return loginLink.url

    }catch(err){

        console.log(err);
        return null
    }
}
