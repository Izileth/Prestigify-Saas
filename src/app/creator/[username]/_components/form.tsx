"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import {getStripeJs} from '@/lib/stripe-js'

import { createPayment } from "../_actions/create-payment"
import { toast } from "sonner"
const formSchema = z.object({
    name: z.string().min(1, "O Nome é obigatorio"),
    message: z.string().min(1, "A mensagem é obigatoria"),
    price: z.enum(["15", "25", "35", "40", "50"],{
        required_error: "Selecione um valor",
    }),
})

type FormData = z.infer<typeof formSchema>

interface FormDataProps {
    slug: string;
    creatorId: string;
}
export function FormData({slug, creatorId}: FormDataProps ) {

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            message: "",
            price: "15",
        },
    })
 
  // 2. Define a submit handler.
    async function onSubmit(data: FormData) {

        const priceInCents = Number(data.price) * 100;

        const checkout = await createPayment({
            name: data.name,
            message: data.message,
            slug: slug,
            price: priceInCents,
            creatorId: creatorId
        });

        if(checkout.error){
            toast.error(checkout.error)
            return;
        }

        if(checkout.data){
            const data = JSON.parse(checkout.data)
            
            const stripe = await getStripeJs()

            stripe?.redirectToCheckout({
                sessionId: data.id as string
            })
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-2 mt-2">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                        <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Menssagem</FormLabel>
                    <FormControl>
                        <Textarea className="resize-none h-32" placeholder="Digite sua mensagem" {...field} />
                    </FormControl>
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                  
                  <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Valor da Doação</FormLabel>
                    <FormControl>
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex items-center gap-2">
                            {
                                ["15", "25", "35", "40", "50"].map((value) => (
                                    <div key={value} className="flex items-center gap-2">
                                        <RadioGroupItem value={value} id={value} />
                                        <Label className=" gap-2" htmlFor={`value-${value}`}>R$ {value}</Label>
                                    </div>
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button 
                disabled={form.formState.isSubmitting}
                type="submit">{form.formState.isSubmitting ? "Carregando..." : "Doar"}</Button>
            </form>
        </Form>
    )
}