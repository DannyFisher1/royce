"use client";

import { motion } from "framer-motion";
import React from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} // Optional: add exit animation if using AnimatePresence
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            {children}
        </motion.div>
    );
} 