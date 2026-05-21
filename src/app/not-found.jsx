"use client";

import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        <div className="flex justify-center mb-6">
          <motion.div 
            initial={{ rotate: -15, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
            className="w-24 h-24 rounded-full bg-pink-100 dark:bg-pink-950/30 flex items-center justify-center"
          >
            <FaExclamationTriangle className="text-4xl text-pink-500" />
          </motion.div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-6xl font-black text-slate-800 dark:text-white mb-3"
        >
          404
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-2xl font-bold text-slate-700 dark:text-zinc-200 mb-3"
        >
          Page Not Found
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-slate-500 dark:text-zinc-400 mb-8"
        >
          Sorry, the page you are looking for does not exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-md hover:opacity-95 transition cursor-pointer"
            >
              Back To Home
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}