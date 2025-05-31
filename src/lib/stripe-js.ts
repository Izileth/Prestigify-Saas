import {loadStripe} from '@stripe/stripe-js'

export async function getStripeJs() {
    const stripeJs = await loadStripe(process.env.PAYMENT_PUBLIC_KEY as string)
    return stripeJs
}