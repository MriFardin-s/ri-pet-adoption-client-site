"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PetCard({ pet, onEditClick, onRequestClick }) {
    const router = useRouter();

    const currentStatus = (pet.status || "AVAILABLE").toUpperCase();

    return (
        <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800/50 p-4 flex flex-col justify-between"
        >
            <div>
                <div className="relative overflow-hidden rounded-xl">
                    <Image
                        width={200}
                        height={200}
                        src={pet.imageUrl || "https://via.placeholder.com/150"} 
                        alt={pet.petName} 
                        className="w-full h-48 object-cover" 
                    />
                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        currentStatus === "PENDING" ? "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400" : 
                        currentStatus === "APPROVED" || currentStatus === "ADOPTED" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400" : 
                        "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
                    }`}>
                        {currentStatus}
                    </span>
                </div>

                <div className="mt-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">{pet.petName}</h3>
                    <p className="text-pink-500 font-bold mt-1">{pet.adoptionFee} BDT</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => onRequestClick?.(pet)}
                    className="border border-slate-200 dark:border-zinc-700 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition cursor-pointer"
                >
                    Requests
                </motion.button>
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => onEditClick?.(pet)}
                    className="border border-slate-200 dark:border-zinc-700 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition cursor-pointer"
                >
                    Edit
                </motion.button>
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => router.push(`/all-pets/${pet._id}`)}
                    className="border border-slate-200 dark:border-zinc-700 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition cursor-pointer"
                >
                    View
                </motion.button>
            </div>
        </motion.div>
    );
}