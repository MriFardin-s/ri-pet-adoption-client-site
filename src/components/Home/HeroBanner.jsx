"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineHeart, HiOutlinePlusCircle } from "react-icons/hi";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function HeroBanner() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-950/20 dark:to-base-100 py-20 lg:py-32 border-b border-pink-100 dark:border-pink-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 text-center lg:text-left"
                >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-pink-200/60 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 uppercase tracking-wider">
                        <HiOutlineHeart className="text-sm" /> Find Your Best Friend
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-pink-950 dark:text-pink-100 leading-tight">
                        Give a Loving Home to a <span className="text-pink-600 dark:text-pink-400">Furry Companion</span>
                    </h1>
                    <p className="text-base sm:text-lg text-neutral-600 dark:text-pink-100/70 font-medium max-w-xl mx-auto lg:mx-0">
                        Thousands of innocent pets are waiting for a second chance. Adopt today, save a precious life, and bring endless happiness into your home.
                    </p>
                    <div className="pt-2 flex flex-col gap-3">
                        <Link
                            href="/all-pets"
                            className="px-6 py-3 rounded-full border-2 border-pink-500 text-pink-600 font-bold text-sm transition-all hover:bg-pink-50 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                             <Heart size={15} fill="currentColor" />
                            Adopt Now
                        </Link>
                        <Link
                            href="/dashboard/add-pet"
                            className="px-6 py-3 rounded-full border-2 border-pink-500 text-pink-600 font-bold text-sm transition-all hover:bg-pink-50 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <HiOutlinePlusCircle className="text-xl" />
                            Add New Pet
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative max-w-md mx-auto lg:max-w-none w-full aspect-square lg:aspect-auto lg:h-[450px]"
                >
                    <div className="absolute inset-0 bg-pink-300 dark:bg-pink-800 rounded-[40px] rotate-6 scale-95 opacity-30"></div>
                    <Image
                        src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800"
                        alt="Happy Dog"
                        className="w-full h-full object-cover rounded-[40px] shadow-xl relative z-10"
                        width={800}
                        height={800}
                        priority
                    />
                </motion.div>
            </div>
        </section>
    );
}