"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export default function PetCard({ pet, onEditClick, onRequestClick }) {
    const router = useRouter();

    const currentStatus = (pet.status || "AVAILABLE").toUpperCase();

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col justify-between">
            <div>
                <div className="relative">
                    <Image
                        width={200}
                        height={200}
                        src={pet.imageUrl || "https://via.placeholder.com/150"} 
                        alt={pet.petName} 
                        className="w-full h-48 object-cover rounded-xl" 
                    />
                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        currentStatus === "PENDING" ? "bg-amber-50 text-amber-600" : 
                        currentStatus === "APPROVED" || currentStatus === "ADOPTED" ? "bg-emerald-50 text-emerald-600" : 
                        "bg-rose-50 text-rose-600"
                    }`}>
                        {currentStatus}
                    </span>
                </div>

                <div className="mt-4">
                    <h3 className="text-xl font-bold text-slate-800">{pet.petName}</h3>
                    <p className="text-pink-500 font-bold mt-1">{pet.adoptionFee} BDT</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
                <button 
                    type="button"
                    onClick={() => onRequestClick?.(pet)}
                    className="border border-slate-200 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                    Requests
                </button>
                <button 
                    type="button"
                    onClick={() => onEditClick?.(pet)}
                    className="border border-slate-200 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                    Edit
                </button>
                <button 
                    type="button"
                    onClick={() => router.push(`http://localhost:3000/all-pets/${pet._id}`)}
                    className="border border-slate-200 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                    View
                </button>
            </div>
        </div>
    );
}