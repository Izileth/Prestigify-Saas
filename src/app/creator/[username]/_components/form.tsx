"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"
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

import {motion} from 'framer-motion'
import { Heart, Loader2 } from "lucide-react"

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

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
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

    const priceOptions = ["15", "25", "35", "40", "50"]

    async function onSubmit(data: FormData) {

        const priceInCents = Number(data.price) * 100;

        const checkout = await createPayment({
            name: data.name,
            message: data.message,
            slug: slug,
            price: priceInCents,
            creatorId: creatorId
        });

        await handlePaymentReposnse(checkout)
    }

    async function handlePaymentReposnse(checkout: {sessionId?: string, error?: string}){
        
        if(checkout.error){
            toast.error(checkout.error)
            return;
        }

        if(!checkout.sessionId){
            toast.error("Falha ao criar o pagemento, Erro ao redirecionar para o checkout")
            return;
        }


            
        const stripe = await getStripeJs()

        if(!stripe){
            toast.error("Falha ao criar o pagamento, Erro ao redirecionar para o checkout")
            return;
        }

        stripe?.redirectToCheckout({
            sessionId: checkout.sessionId 
        })
    }

    return (
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Name Field */}
            <motion.div variants={fadeInUp}>
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-gray-900 font-medium">Nome</FormLabel>
                    <FormControl>
                        <motion.div
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                        <Input
                            placeholder="Digite seu nome"
                            className="border-gray-200 focus:border-gray-400 rounded-none h-12 bg-gray-50/50 transition-all duration-300"
                            {...field}
                        />
                        </motion.div>
                    </FormControl>
                    <FormDescription className="text-gray-500 text-sm font-light">
                        Seu nome será exibido junto com a doação
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </motion.div>

            {/* Message Field */}
            <motion.div variants={fadeInUp}>
                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-gray-900 font-medium">Mensagem</FormLabel>
                    <FormControl>
                        <motion.div
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                        <Textarea
                            className="resize-none h-32 border-gray-200 focus:border-gray-400 rounded-none bg-gray-50/50 transition-all duration-300"
                            placeholder="Digite sua mensagem de apoio..."
                            {...field}
                        />
                        </motion.div>
                    </FormControl>
                    <FormDescription className="text-gray-500 text-sm font-light">
                        Deixe uma mensagem carinhosa para o criador
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </motion.div>

            {/* Price Selection */}
            <motion.div variants={fadeInUp}>
                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-gray-900 font-medium">Valor da Doação</FormLabel>
                    <FormControl>
                        <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4"
                        >
                        {priceOptions.map((value, index) => (
                            <motion.div
                            key={value}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            >
                            <Label
                                htmlFor={value}
                                className={`flex items-center justify-center p-4 rounded-none border-2 cursor-pointer transition-all duration-300 ${
                                field.value === value
                                    ? "border-gray-900 bg-gray-900 text-white shadow-lg"
                                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                                }`}
                            >
                                <RadioGroupItem value={value} id={value} className="sr-only" />
                                <span className="font-medium">R$ {value}</span>
                            </Label>
                            </motion.div>
                        ))}
                        </RadioGroup>
                    </FormControl>
                    <FormDescription className="text-gray-500 text-sm font-light">
                        Escolha o valor que deseja doar
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={fadeInUp} className="pt-4">
                <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                <Button
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium h-12 rounded-none shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    {form.formState.isSubmitting ? (
                    <motion.div className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                    </motion.div>
                    ) : (
                    <motion.div className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Heart className="mr-2 h-4 w-4" />
                        Doar com Amor
                    </motion.div>
                    )}
                </Button>
                </motion.div>
            </motion.div>
            </form>
        </Form>
        </motion.div>
    )
}