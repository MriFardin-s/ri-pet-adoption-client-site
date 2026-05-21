"use client";

import React, { useState, useEffect } from "react";
import { FaPaw, FaCheck } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

export default function AdoptForm({ petName, petId, petStatus, ownerEmail, isOwner }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dbRequestStatus, setDbRequestStatus] = useState(null);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
  if (!session?.user?.email || !petId) return;

  const fetchUserStatus = async () => {
    try {
      const tokenResponse = await authClient.token();
      const token = tokenResponse?.data?.token || tokenResponse?.token;

      const email = encodeURIComponent(session.user.email);
      const url = `http://localhost:9000/adoptions/user-status?petId=${petId}&email=${email}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        }
      });

      if (!res.ok) throw new Error("Failed to fetch status");

      const data = await res.json();
      if (data && data.status) {
        setDbRequestStatus(data.status);
      }
    } catch (err) {
      console.error("Error fetching status:", err);
    }
  };

  fetchUserStatus();
}, [petId, session?.user?.email]); 

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login first!");
      return;
    }
    if (petStatus === "adopted" || petStatus === "approved" || dbRequestStatus === "approved") {
      toast.error("This pet has already been adopted!");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const adoptionRequest = {
      petId: petId,
      petName: petName || "Unknown Pet",
      userName: session?.user?.name || "",
      userEmail: session?.user?.email || "",
      pickupDate: formData.get("pickupDate"),
      message: formData.get("message"),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const tokenResponse = await authClient.token();
      const token = tokenResponse?.data?.token || tokenResponse?.token;

      const res = await fetch("http://localhost:9000/adoptions", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: JSON.stringify(adoptionRequest),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to submit adoption request");
        return;
      }

      toast.success(`Adoption request for ${petName || "Pet"} submitted!`);
      e.target.reset();
      setTimeout(() => { window.location.reload(); }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveStatus = async () => {
    setIsSubmitting(true);
    try {
      const tokenResponse = await authClient.token();
      const token = tokenResponse?.data?.token || tokenResponse?.token;

      const res = await fetch(`http://localhost:9000/adoptions/approve/${petId}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
      });
      if (!res.ok) throw new Error("Failed to approve request");
      toast.success("Adoption request approved successfully!");
      setTimeout(() => { window.location.reload(); }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStatus = dbRequestStatus?.toLowerCase();
  const isApproved = petStatus === "approved" || petStatus === "adopted" || currentStatus === "approved";
  const isPendingStatus = currentStatus === "pending";
  const isRejectedStatus = currentStatus === "rejected";
  
  const isFormDisabled = isApproved || isPendingStatus || isRejectedStatus || isOwner;

  if (!mounted) {
    return (
      <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-pink-100 dark:border-pink-950/20 flex flex-col justify-center items-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full mb-2"
        />
        <p className="text-sm text-slate-400">Loading adoption form...</p>
      </div>
    );
  }

  const getRequesterButtonText = () => {
    if (isApproved) return "Approved";
    if (isPendingStatus) return "Request Pending";
    if (isRejectedStatus) return "Request Rejected";
    return "Submit Request";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="w-full h-full bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-pink-100 dark:border-pink-950/20 flex flex-col justify-between"
    >
      <form onSubmit={handleAdoptSubmit} className="flex flex-col h-full justify-between space-y-5">
        <div className="space-y-5">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-slate-800 dark:text-zinc-100 flex items-center justify-center gap-2">
              <FaPaw className="text-pink-500 text-xl" /> Adopt {petName || "Pet"}
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Pet Name</label>
            <input type="text" defaultValue={petName || ""} readOnly className="w-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-semibold px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 cursor-not-allowed outline-none text-sm" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Your Name</label>
            <input type="text" defaultValue={session?.user?.name || ""} readOnly className="w-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-semibold px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 cursor-not-allowed outline-none text-sm" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Your Email</label>
            <input type="email" defaultValue={session?.user?.email || ""} readOnly className="w-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-semibold px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 cursor-not-allowed outline-none text-sm" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Pickup Date</label>
            <input type="date" name="pickupDate" required disabled={isFormDisabled} className="w-full bg-transparent disabled:bg-slate-50 dark:disabled:bg-zinc-800 dark:text-zinc-100 text-slate-800 px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 outline-none focus:border-pink-500 text-sm" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Message</label>
            <textarea name="message" required disabled={isFormDisabled} placeholder="Write a short message to the owner..." className="w-full bg-transparent disabled:bg-slate-50 dark:disabled:bg-zinc-800 dark:text-zinc-100 text-slate-800 px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 outline-none focus:border-pink-500 min-h-[100px] text-sm"></textarea>
          </div>
        </div>

        <div className="mt-6">
          {isOwner ? (
            <motion.button
              whileHover={!(isSubmitting || isApproved || !isPendingStatus) ? { opacity: 0.95 } : {}}
              whileTap={!(isSubmitting || isApproved || !isPendingStatus) ? { scale: 0.99 } : {}}
              type="button"
              onClick={handleApproveStatus}
              disabled={isSubmitting || isApproved || !isPendingStatus}
              className="w-full font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-white bg-gradient-to-r from-green-500 to-emerald-600 disabled:from-zinc-300 disabled:to-zinc-300 dark:disabled:from-zinc-800 dark:disabled:to-zinc-800 disabled:text-zinc-500 cursor-pointer disabled:cursor-not-allowed text-sm"
            >
              {isApproved ? "Approved" : isPendingStatus ? (isSubmitting ? "Approving..." : <><FaCheck /> Approve Request</>) : "Pending"}
            </motion.button>
          ) : (
            <motion.button
              whileHover={!(isSubmitting || isApproved || isPendingStatus || isRejectedStatus) ? { opacity: 0.95 } : {}}
              whileTap={!(isSubmitting || isApproved || isPendingStatus || isRejectedStatus) ? { scale: 0.99 } : {}}
              disabled={isSubmitting || isApproved || isPendingStatus || isRejectedStatus}
              type="submit"
              className={`w-full py-3.5 rounded-xl font-bold transition-all text-sm cursor-pointer disabled:cursor-not-allowed ${
                (isApproved || isPendingStatus || isRejectedStatus) 
                  ? "bg-zinc-300 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400" 
                  : "bg-pink-500 text-white shadow-md shadow-pink-200 dark:shadow-none"
              }`}
            >
              {getRequesterButtonText()}
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
}