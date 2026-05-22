"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiCheck, HiOutlineCalendar, HiOutlineEnvelope, HiOutlineUser } from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";

export default function PetRequestsModal({ isOpen, onClose, pet, onStatusUpdated }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const isPetAlreadyAdopted = pet?.status?.toLowerCase() === "adopted" || pet?.status?.toLowerCase() === "approved";

    useEffect(() => {
        if (!isOpen || !pet?._id) return;

        const fetchPetRequests = async () => {
            setLoading(true);
            try {
                const tokenResponse = await authClient.token();
                const token = tokenResponse?.data?.token || tokenResponse?.token;

                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoptions/pet-requests/${pet._id}`, {
                    method: "GET",
                    headers: {
                        ...(token && { "Authorization": `Bearer ${token}` })
                    }
                });

                if (!res.ok) throw new Error("Not Found");
                const data = await res.json();
                setRequests(data);
            } catch (error) {
                toast.error("Failed to load requests from backend");
            } finally {
                setLoading(false);
            }
        };

        fetchPetRequests();
    }, [isOpen, pet?._id]);

    const handleAction = async (requestId, action) => {
        const targetStatus = action === "APPROVED" ? "approved" : "rejected";

        try {
            const tokenResponse = await authClient.token();
            const token = tokenResponse?.data?.token || tokenResponse?.token;

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoptions/status/${requestId}`, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                    ...(token && { "Authorization": `Bearer ${token}` })
                },
                body: JSON.stringify({ status: targetStatus, petId: pet._id }),
            });

            if (!res.ok) throw new Error();

            toast.success(`Request ${action.toLowerCase()} successfully`);
            
            setRequests((prev) =>
                prev.map((req) => (req._id === requestId ? { ...req, status: targetStatus } : req))
            );

            if (action === "APPROVED" && onStatusUpdated) {
                onStatusUpdated(pet._id, "adopted");
                onClose();
            }
            
        } catch (error) {
            toast.error("Action failed");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
                onClick={onClose} 
            />
            

            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
                className="relative bg-white dark:bg-zinc-900 w-full max-w-[500px] rounded-2xl shadow-2xl border border-slate-100 dark:border-zinc-800 flex flex-col max-h-[80vh] overflow-hidden"
            >

                <div className="flex items-center justify-between pt-6 px-6 pb-4 border-b border-slate-100 dark:border-zinc-800/80">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 tracking-tight">
                        Adoption Requests for <span className="text-pink-500 font-extrabold">{pet?.petName}</span>
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors cursor-pointer text-xl font-medium"
                    >
                        &times;
                    </button>
                </div>

               
                <div className="p-6 overflow-y-auto flex-1 space-y-4">
                    {loading ? (
                        <div className="flex flex-col justify-center items-center py-12 gap-3">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-8 h-8 border-3 border-pink-100 border-t-pink-500 rounded-full"
                            />
                            <p className="text-sm font-medium text-slate-400 dark:text-zinc-500">Loading requests...</p>
                        </div>
                    ) : requests.length === 0 ? (
                        <p className="text-center text-sm font-medium text-slate-400 dark:text-zinc-500 py-12">
                            No adoption requests found for this pet.
                        </p>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            {requests.map((request) => {
                                const requestStatus = request.status?.toLowerCase();
                                const showButtons = !isPetAlreadyAdopted && requestStatus === "pending";

                                return (
                                    <div 
                                        key={request._id} 
                                        className="p-4 border border-slate-100 dark:border-zinc-800/60 rounded-xl flex flex-col gap-3.5 bg-slate-50/50 dark:bg-zinc-800/20 shadow-xs"
                                    >
                                        <div className="space-y-3 text-sm text-slate-700 dark:text-zinc-300">
                                            <div className="flex items-start gap-2.5">
                                                <HiOutlineUser className="text-slate-400 dark:text-zinc-500 mt-0.5 text-base" />
                                                <div>
                                                    <span className="font-bold text-slate-400 dark:text-zinc-500 text-xs uppercase tracking-wider block">Requester Name</span>
                                                    <p className="font-semibold text-slate-800 dark:text-zinc-100">{request.userName || request.name || "N/A"}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-start gap-2.5">
                                                <HiOutlineEnvelope className="text-slate-400 dark:text-zinc-500 mt-0.5 text-base" />
                                                <div className="break-all">
                                                    <span className="font-bold text-slate-400 dark:text-zinc-500 text-xs uppercase tracking-wider block">Requester Email</span>
                                                    <p className="font-semibold text-slate-800 dark:text-zinc-100">{request.userEmail || request.email}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-2.5">
                                                <HiOutlineCalendar className="text-slate-400 dark:text-zinc-500 mt-0.5 text-base" />
                                                <div>
                                                    <span className="font-bold text-slate-400 dark:text-zinc-500 text-xs uppercase tracking-wider block">Pickup Date</span>
                                                    <p className="font-bold text-amber-600 dark:text-amber-400">{request.pickupDate || request.date || "Not specified"}</p>
                                                </div>
                                            </div>

                                            {request.message && (
                                                <div className="mt-2 bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700/60 p-3 rounded-lg">
                                                    <span className="font-bold text-slate-400 dark:text-zinc-500 text-[11px] uppercase tracking-wider block mb-1">Message</span>
                                                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                                                        {request.message}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-2 justify-end mt-1 items-center select-none">
                                            <AnimatePresence mode="wait">
                                                {showButtons ? (
                                                    <div className="flex gap-2.5">
                                                        <motion.button 
                                                            whileHover={{ opacity: 0.9 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            type="button"
                                                            onClick={() => handleAction(request._id, "REJECTED")}
                                                            className="px-4 py-2 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100/70 dark:hover:bg-rose-950/40 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                                                        >
                                                            <HiXMark className="text-sm stroke-2" /> Reject
                                                        </motion.button>
                                                        <motion.button 
                                                            whileHover={{ opacity: 0.9 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            type="button"
                                                            onClick={() => handleAction(request._id, "APPROVED")}
                                                            className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100/70 dark:hover:bg-emerald-950/40 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                                                        >
                                                            <HiCheck className="text-sm stroke-2" /> Approve
                                                        </motion.button>
                                                    </div>
                                                ) : (
                                                    <span className={`px-3 py-1.5 rounded-lg text-xs font-black tracking-wide uppercase shadow-2xs border ${
                                                        requestStatus === "approved" ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30" :
                                                        requestStatus === "rejected" ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30" :
                                                        "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30"
                                                    }`}>
                                                        {requestStatus === "approved" ? "Approved" : 
                                                         requestStatus === "rejected" ? "Rejected" : 
                                                         "Already Adopted"}
                                                    </span>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                    </div>
                                );
                            })}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}