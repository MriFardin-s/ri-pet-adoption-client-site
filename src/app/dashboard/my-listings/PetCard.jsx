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
    // console.log(pet)

    const statusStyles = {
        "PENDING": "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
        "ADOPTED": "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
        "AVAILABLE": "bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-400 dark:border-sky-900/50 border-sky-100"
    };

    const handleConfirmDelete = () => {
        onDeleteClick?.(pet);
        setIsDeleteAlertOpen(false);
    };

    return (
        <motion.div 
            layout 
            whileHover={{ y: -6 }}
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
                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase ${statusStyles[currentStatus] || "bg-slate-50 text-slate-600"}`}>
                        {currentStatus}
                    </span>
                </div>

                <div className="mt-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">{pet.petName}</h3>
                    <p className="text-pink-500 font-bold mt-1">{Number(pet.adoptionFee).toLocaleString()} BDT</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
                <button 
                    onClick={(e) => { e.stopPropagation(); onRequestClick?.(pet); }} 
                    className="border p-2 rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-zinc-800 transition flex items-center justify-center gap-1.5"
                >
                    <HiOutlineClipboardDocumentList className="text-sm" /> Requests
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onEditClick?.(pet); }} 
                    className="border p-2 rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-zinc-800 transition flex items-center justify-center gap-1.5"
                >
                    <HiOutlinePencil className="text-sm" /> Edit
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); router.push(`/all-pets/${pet._id}`); }} 
                    className="border p-2 rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-zinc-800 transition flex items-center justify-center gap-1.5"
                >
                    <HiOutlineEye className="text-sm" /> View
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); setIsDeleteAlertOpen(true); }}
                    className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30 py-2 rounded-xl text-xs font-medium hover:bg-rose-100 dark:hover:bg-rose-950/40 transition flex items-center justify-center gap-1.5"
                >
                    <HiOutlineTrash className="text-sm" /> Delete
                </button>
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