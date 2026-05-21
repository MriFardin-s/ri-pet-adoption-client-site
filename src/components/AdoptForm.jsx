"use client";

import React, { useState, useEffect } from "react";
import { FaPaw, FaCheck } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AdoptForm({ petName, petId, petStatus, ownerEmail, isOwner }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login first!");
      return;
    }
    if (petStatus === "adopted" || petStatus === "approved") {
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
      const res = await fetch("http://localhost:9000/adoptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      const res = await fetch(`http://localhost:9000/adoptions/approve/${petId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
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

  const isApproved = petStatus === "approved" || petStatus === "adopted";
  const isPendingStatus = petStatus === "pending";

  if (!mounted) {
    return (
      <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-pink-100 dark:border-pink-950/20 flex flex-col justify-center items-center min-h-[400px]">
        <p className="text-sm text-slate-400 animate-pulse">Loading adoption form...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-pink-100 dark:border-pink-950/20 flex flex-col justify-between">
      <form onSubmit={handleAdoptSubmit} className="flex flex-col h-full justify-between space-y-5">
       <div className="space-y-5">
  <div className="text-center mb-6">
    <h2 className="text-2xl font-black text-slate-800 dark:text-zinc-100">Adopt {petName || "Pet"}</h2>
  </div>

  <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Pet Name</label>
    <input type="text" defaultValue={petName || ""} readOnly className="w-full bg-slate-100 dark:bg-zinc-800 text-slate-600 font-semibold px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 cursor-not-allowed outline-none" />
  </div>

  <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Your Name</label>
    <input type="text" defaultValue={session?.user?.name || ""} readOnly className="w-full bg-slate-100 dark:bg-zinc-800 text-slate-600 font-semibold px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 cursor-not-allowed outline-none" />
  </div>

  <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Your Email</label>
    <input type="email" defaultValue={session?.user?.email || ""} readOnly className="w-full bg-slate-100 dark:bg-zinc-800 text-slate-600 font-semibold px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 cursor-not-allowed outline-none" />
  </div>


  <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Pickup Date</label>
    <input type="date" name="pickupDate" required disabled={isApproved || isPendingStatus || isOwner} className="w-full bg-transparent disabled:bg-slate-50 dark:bg-zinc-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-pink-500" />
  </div>


  <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Message</label>
    <textarea name="message" required disabled={isApproved || isPendingStatus || isOwner} placeholder="Write a short message to the owner..." className="w-full bg-transparent disabled:bg-slate-50 dark:bg-zinc-800 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-pink-500 min-h-[100px]"></textarea>
  </div>
</div>

        <div className="mt-6">
          {isOwner ? (
            <button
              type="button"
              onClick={handleApproveStatus}
              disabled={isSubmitting || isApproved || !isPendingStatus}
              className="w-full font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-white bg-gradient-to-r from-green-500 to-emerald-600 disabled:bg-zinc-400"
            >
              {isApproved ? "Approved" : isPendingStatus ? (isSubmitting ? "Approving..." : <><FaCheck /> Approve Request</>) : "Pending"}
            </button>
          ) : (
            <button
              disabled={isSubmitting || isApproved || isPendingStatus}
              type="submit"
              className={`w-full py-3 rounded-xl font-bold transition-all ${(isApproved || isPendingStatus) ? "bg-zinc-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600 text-white"}`}
            >
              {isPendingStatus ? "Request Pending" : "Submit Request"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}