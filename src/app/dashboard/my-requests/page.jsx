"use client";

import React, { useEffect, useState, useMemo } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Eye, Trash2, Calendar, Clock, PawPrint } from "lucide-react";
import DeleteAlert from "@/components/DeleteAlert";
import { motion } from "framer-motion";

export default function MyRequestsPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const stats = useMemo(() => {
    return {
      total: requests.length,
      pending: requests.filter((r) => r.status === "pending").length,
      approved: requests.filter((r) => r.status === "approved").length,
      rejected: requests.filter((r) => r.status === "rejected").length,
    };
  }, [requests]);

  const fetchMyRequests = async () => {
    try {
      const tokenResponse = await authClient.token();
      const token = tokenResponse?.data?.token || tokenResponse?.token;
      if (!token) return;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoptions/my-requests`, {
        headers: { authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      toast.error("Could not load requests");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionLoading && session?.user?.email) fetchMyRequests();
    else if (!sessionLoading) setIsLoading(false);
  }, [session, sessionLoading]);

  const handleCancelRequest = async () => {
    if (!selectedRequest) return;
    try {
      const tokenResponse = await authClient.token();
      const token = tokenResponse?.data?.token || tokenResponse?.token;
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoptions/${selectedRequest._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Request cancelled");
      setRequests(requests.filter((r) => r._id !== selectedRequest._id));
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to cancel");
    }
  };

  if (sessionLoading || isLoading)  return (
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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-black text-slate-800 dark:text-zinc-100 mb-6">My Adoption Requests</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: stats.total },
          { label: "Pending", value: stats.pending },
          { label: "Approved", value: stats.approved },
          { label: "Rejected", value: stats.rejected },
        ].map((stat, idx) => (
          <div key={idx} className="bg-base-300/40 dark:bg-pink-950/20 p-5 rounded-2xl border border-pink-200 dark:border-pink-900/30 transition-all shadow-sm flex flex-col justify-center items-center">
            <h3 className="text-sm font-bold text-pink-700 uppercase tracking-widest dark:text-pink-400">{stat.label}</h3>
            <p className="text-3xl font-black mt-2 text-[#510424] dark:text-white transition-colors">{stat.value}</p>
          </div>
        ))}
      </div>

      {requests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-300/40 dark:bg-pink-950/20 p-12 rounded-2xl border border-pink-200 dark:border-pink-900/30 transition-all shadow-sm flex flex-col items-center justify-center"
        >
          <div className="w-16 h-16 bg-pink-50 dark:bg-pink-950/30 rounded-full flex items-center justify-center mb-4">
            <Clock className="text-pink-500" size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">No requests yet</h3>
          <p className="text-slate-500 dark:text-zinc-400 mt-2 max-w-sm">
            It looks like you have not made any adoption requests yet. Explore our pets and find your new companion!
          </p>
          <Link
            href="/all-pets"
            className="mt-6 px-4 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-sm transition-all hover:opacity-95 active:scale-[0.98] flex items-center justify-center gap-1.5"
          >
            <PawPrint size={18} />
            Browse All Pets
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <motion.div
              key={req._id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">{req.petName}</h3>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                  req.status === "approved" ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border-emerald-100" :
                  req.status === "rejected" ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 border-rose-100" : 
                  "bg-amber-50 dark:bg-amber-950/30 text-amber-600 border-amber-100"
                }`}>
                  {req.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-500 dark:text-zinc-400 mb-6">
                <div className="flex items-center gap-2"><Clock size={16} /> Requested: {new Date(req.createdAt).toLocaleDateString()}</div>
                <div className="flex items-center gap-2"><Calendar size={16} /> Pickup: {req.pickupDate || "N/A"}</div>
              </div>

              <div className={req.status === "rejected" ? "grid grid-cols-1 gap-2" : "grid grid-cols-2 gap-2"}>
                <Link href={`/all-pets/${req.petId}`} className="flex items-center justify-center gap-2 border border-slate-200 dark:border-zinc-700 p-2 rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-zinc-800 transition">
                  <Eye size={14} /> View
                </Link>
                {req.status !== "rejected" && (
                  <button
                    onClick={() => { setSelectedRequest(req); setIsOpen(true); }}
                    className="flex items-center justify-center gap-2 bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-100 dark:border-rose-900/50 p-2 rounded-xl text-xs hover:bg-rose-100 transition"
                  >
                    <Trash2 size={14} /> Cancel
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <DeleteAlert isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={handleCancelRequest} petName={selectedRequest?.petName} />
    </div>
  );
}