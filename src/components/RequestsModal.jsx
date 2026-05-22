"use client"
import React from "react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RequestsModal({ isOpen, onClose, petId, onRefresh, requests, loading }) {
  const handleStatusChange = async (requestId, status) => {
    try {
      const tokenResponse = await authClient.token();
      const token = tokenResponse?.data?.token || tokenResponse?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoptions/status/${requestId}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: JSON.stringify({ status, petId }),
      });
      if (!res.ok) throw new Error();
      toast.success(`Request ${status}`);
      onClose();
      onRefresh();
    } catch (error) {
      toast.error("Action failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-800 dark:text-zinc-100">Adoption Requests</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl font-bold">×</button>
        </div>
        <div className="p-6 max-h-[400px] overflow-y-auto">
          {loading ? (
            <p className="text-center text-slate-400 animate-pulse">Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="text-center text-slate-500">No requests received for this pet.</p>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req._id} className="p-4 border border-slate-100 dark:border-zinc-800 rounded-xl bg-slate-50/50 dark:bg-zinc-950 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-zinc-200">{req.userName}</h4>
                    <p className="text-xs text-slate-400">{req.userEmail}</p>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Pickup Date: {req.pickupDate || "N/A"}</p>
                    <span className="inline-block mt-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                      Current Status: {req.status || "pending"}
                    </span>
                  </div>
                  {(!req.status || req.status === "pending") && (
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button onClick={() => handleStatusChange(req._id, "approved")} className="flex-1 sm:flex-initial px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition">
                        Approve
                      </button>
                      <button onClick={() => handleStatusChange(req._id, "rejected")} className="flex-1 sm:flex-initial px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}