"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function PetRequestsModal({ isOpen, onClose, pet, onStatusUpdated }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const isPetAlreadyAdopted = pet?.status?.toLowerCase() === "adopted";

    useEffect(() => {
        if (!isOpen || !pet?._id) return;

        setLoading(true);
        fetch(`http://localhost:9000/adoptions/pet-requests/${pet._id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Not Found");
                return res.json();
            })
            .then((data) => {
                setRequests(data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load requests from backend");
                setLoading(false);
            });
    }, [isOpen, pet?._id]);

    const handleAction = async (requestId, action) => {
        const targetStatus = action === "APPROVED" ? "approved" : "rejected";

        try {
            const res = await fetch(`http://localhost:9000/adoptions/status/${requestId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: targetStatus, petId: pet._id }),
            });

            if (!res.ok) throw new Error();

            toast.success(`Request ${action.toLowerCase()} successfully`);
            
            if (action === "APPROVED" && onStatusUpdated) {
                onStatusUpdated(pet._id, "adopted");
            } else {
                setRequests((prev) =>
                    prev.map((req) => (req._id === requestId ? { ...req, status: targetStatus } : req))
                );
            }
            
            onClose();
        } catch (error) {
            toast.error("Action failed");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white dark:bg-zinc-900 w-full max-w-[500px] rounded-2xl shadow-2xl border border-slate-100 dark:border-zinc-800 flex flex-col max-h-[80vh] overflow-hidden">
                
                <div className="flex items-center justify-between pt-6 px-6 pb-4 border-b border-slate-50 dark:border-zinc-800">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100">
                        Adoption Requests for <span className="text-pink-500">{pet?.petName}</span>
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 text-xl font-semibold cursor-pointer">&times;</button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 space-y-4">
                    {loading ? (
                        <p className="text-center text-sm text-slate-400">Loading requests...</p>
                    ) : requests.length === 0 ? (
                        <p className="text-center text-sm text-slate-400">No adoption requests found for this pet.</p>
                    ) : (
                        requests.map((request) => {
                            const requestStatus = request.status?.toLowerCase();
                            const showButtons = !isPetAlreadyAdopted && requestStatus !== "approved" && requestStatus !== "rejected";

                            return (
                                <div key={request._id} className="p-4 border border-slate-100 dark:border-zinc-800 rounded-xl flex flex-col gap-3 bg-slate-50/50 dark:bg-zinc-800/30">
                                    
                                    <div className="space-y-1.5 text-sm text-slate-700 dark:text-zinc-300">
                                        <div>
                                            <span className="font-semibold text-slate-500 text-xs block">Requester Name:</span>
                                            <p className="font-medium text-slate-800 dark:text-zinc-100">{request.userName || request.name || "N/A"}</p>
                                        </div>
                                        
                                        <div>
                                            <span className="font-semibold text-slate-500 text-xs block">Requester Email:</span>
                                            <p className="font-medium text-slate-800 dark:text-zinc-100">{request.userEmail || request.email}</p>
                                        </div>

                                        <div>
                                            <span className="font-semibold text-slate-500 text-xs block">Pickup Date:</span>
                                            <p className="font-medium text-amber-600 dark:text-amber-400">{request.pickupDate || request.date || "Not specified"}</p>
                                        </div>

                                        {request.message && (
                                            <div className="mt-2">
                                                <span className="font-semibold text-slate-500 text-xs block">Message:</span>
                                                <p className="text-xs text-slate-600 dark:text-zinc-400 bg-white dark:bg-zinc-800 p-2 rounded-lg border border-slate-100 dark:border-zinc-700">
                                                    {request.message}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2 justify-end mt-2 items-center">
                                        {showButtons ? (
                                            <>
                                                <button 
                                                    type="button"
                                                    onClick={() => handleAction(request._id, "REJECTED")}
                                                    className="px-4 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-lg transition cursor-pointer"
                                                >
                                                    Reject
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={() => handleAction(request._id, "APPROVED")}
                                                    className="px-4 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-xs font-bold rounded-lg transition cursor-pointer"
                                                >
                                                    Approve
                                                </button>
                                            </>
                                        ) : (
                                            <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase ${
                                                requestStatus === "approved" ? "bg-emerald-100 text-emerald-700" :
                                                requestStatus === "rejected" ? "bg-rose-100 text-rose-700" :
                                                "bg-amber-100 text-amber-700"
                                            }`}>
                                                {requestStatus === "approved" ? "Approved" : 
                                                 requestStatus === "rejected" ? "Rejected" : 
                                                 "Already Adopted"}
                                            </span>
                                        )}
                                    </div>

                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}