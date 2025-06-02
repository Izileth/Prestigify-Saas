'use client';

import { motion } from "framer-motion"

import { FeatureCard } from "@/components/FeatureCard"

import { Button } from "@/components/ui/button"

import { ArrowRight,   Heart, Shield, Zap } from "lucide-react"

import { Header } from "./dashboard/_components/header";

import { handleRegister } from "./_components/form-register";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      {/* Header */}
      <div
        className="relative z-10 border-b border-gray-100 md:px-6"
      >
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <motion.div className="max-w-4xl mx-auto" variants={staggerContainer} initial="initial" animate="animate">
            {/* Hero Section */}
            <div className="text-center space-y-8">
              <motion.div variants={fadeInUp} className="inline-block">
                <div className="inline-flex items-center bg-gray-50 border border-gray-200 text-gray-700 px-6 py-2 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 animate-pulse" />
                  Plataforma para criadores de conteúdo
                </div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl font-light tracking-tight sm:text-5xl md:text-6xl text-gray-900 leading-tight"
              >
                Monetize seu público de forma{" "}
                <motion.span
                  className="font-medium relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  descomplicada
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                </motion.span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
              >
                Receba doações diretamente dos seus seguidores através de uma página personalizada e elegante, sem
                complicações.
              </motion.p>

              <motion.div variants={fadeInUp} className="pt-6">
                <form action={handleRegister}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 h-12 rounded-full border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Começar agora
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </div>

            {/* Decorative Line */}
            <motion.div
              className="flex justify-center my-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <motion.div
                className="w-24 h-px bg-gray-300"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </motion.div>

            {/* Features Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={slideInLeft}>
                <FeatureCard
                  icon={<Zap className="h-8 w-8 text-gray-700" />}
                  title="Rápido e simples"
                  description="Configure sua página em minutos e comece a receber doações imediatamente."
                />
              </motion.div>
              <motion.div variants={slideInLeft}>
                <FeatureCard
                  icon={<Heart className="h-8 w-8 text-gray-700" />}
                  title="Conexão direta"
                  description="Crie uma conexão mais próxima com seus apoiadores através de mensagens personalizadas."
                />
              </motion.div>
              <motion.div variants={slideInLeft}>
                <FeatureCard
                  icon={<Shield className="h-8 w-8 text-gray-700" />}
                  title="Pagamentos seguros"
                  description="Transações protegidas e transferências automáticas para sua conta bancária."
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer with Copyright */}
      <motion.footer
        className="relative z-10 border-t border-gray-100 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <motion.div className="flex items-center text-gray-500 text-sm" whileHover={{ scale: 1.02 }}>
              <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />© {new Date().getFullYear()} Prestigify. Todos os
              direitos reservados.
            </motion.div>
            <motion.div
              className="flex space-x-6 text-sm text-gray-500"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.a
                href="#"
                className="hover:text-gray-900 transition-colors duration-200"
                whileHover={{ y: -2 }}
                variants={fadeInUp}
              >
                Privacidade
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-gray-900 transition-colors duration-200"
                whileHover={{ y: -2 }}
                variants={fadeInUp}
              >
                Termos
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-gray-900 transition-colors duration-200"
                whileHover={{ y: -2 }}
                variants={fadeInUp}
              >
                Suporte
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}