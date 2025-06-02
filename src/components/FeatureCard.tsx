
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FeatureCardProps {
    icon: ReactNode
    title: string
    description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <motion.div
        className="group relative p-8 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 transition-all duration-300"
        whileHover={{
            y: -8,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
            <motion.div
            className="mb-6 inline-flex p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
            {icon}
            </motion.div>

            <motion.h3
            className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            >
            {title}
            </motion.h3>

            <motion.p
            className="text-gray-600 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            >
            {description}
            </motion.p>
        </div>

        {/* Decorative line */}
        <motion.div
            className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
        />
        </motion.div>
    )
}
