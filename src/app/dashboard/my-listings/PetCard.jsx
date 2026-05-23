"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye, HiOutlineClipboardDocumentList } from "react-icons/hi2";
import PetDeleteAlert from "@/components/PetDeleteAlert";

export default function PetCard({ pet, onEditClick, onRequestClick, onDeleteClick }) {
    const router = useRouter();
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    
    const currentStatus = (pet.status || "AVAILABLE").toUpperCase();

    const handleConfirmDelete = () => {
        onDeleteClick?.(pet);
        setIsDeleteAlertOpen(false);
    };

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
                        priority={true}
                        src={pet.imageUrl || "https://via.placeholder.com/150"} 
                        alt={pet.petName} 
                        className="w-full h-48 object-cover" 
                    />
                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        currentStatus === "PENDING" ? "bg-amber-50 text-amber-600" : 
                        currentStatus === "ADOPTED" ? "bg-emerald-50 text-emerald-600" : 
                        "bg-rose-50 text-rose-600"
                    }`}>
                        {currentStatus}
                    </span>
                </div>

                <div className="mt-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">{pet.petName}</h3>
                    <p className="text-pink-500 font-bold mt-1">{pet.adoptionFee} BDT</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
                <motion.button 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => onRequestClick?.(pet)} 
                    className="border p-2 rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-zinc-800 transition flex items-center justify-center gap-1.5"
                >
                    <HiOutlineClipboardDocumentList className="text-sm" /> Requests
                </motion.button>
                <motion.button 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => onEditClick?.(pet)} 
                    className="border p-2 rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-zinc-800 transition flex items-center justify-center gap-1.5"
                >
                    <HiOutlinePencil className="text-sm" /> Edit
                </motion.button>
                <motion.button 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => router.push(`/all-pets/${pet._id}`)} 
                    className="border p-2 rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-zinc-800 transition flex items-center justify-center gap-1.5"
                >
                    <HiOutlineEye className="text-sm" /> View
                </motion.button>
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDeleteAlertOpen(true)}
                    className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30 py-2 rounded-xl text-xs font-medium hover:bg-rose-100 dark:hover:bg-rose-950/40 transition flex items-center justify-center gap-1.5"
                >
                    <HiOutlineTrash className="text-sm" /> Delete
                </motion.button>
            </div>

            <PetDeleteAlert
                isOpen={isDeleteAlertOpen}
                onClose={() => setIsDeleteAlertOpen(false)}
                onConfirm={handleConfirmDelete}
                petName={pet?.petName}
            />
        </motion.div>
    );
}