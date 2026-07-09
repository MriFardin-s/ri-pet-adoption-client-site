"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full"
        />
        <motion.p
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
          className="text-slate-500 dark:text-zinc-400 font-medium"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}