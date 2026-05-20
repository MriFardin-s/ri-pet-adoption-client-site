"use client";

import React, { useState, useEffect } from "react";
import { FaPaw, FaCheck } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AdoptForm({ petName, petId, petStatus, ownerEmail }) {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adoptionRequest),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit adoption request");
      }

      toast.success(`Adoption request for ${petName || "Pet"} submitted!`);
      e.target.reset();

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveStatus = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`http://localhost:9000/adoptions/approve/${petId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to approve request");
      }

      toast.success("Adoption request approved successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to approve");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOwner = session?.user?.email && ownerEmail && session?.user?.email === ownerEmail;
  const isApproved = petStatus === "approved" || petStatus === "adopted";
  const isPendingStatus = petStatus === "pending";

  const isButtonDisabled = 
    isSubmitting || 
    isPending || 
    !session || 
    isApproved || 
    (isPendingStatus && !isOwner);

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
            <h2 className="text-2xl font-black text-slate-800 dark:text-zinc-100">
              Adopt {petName || "Pet"}
            </h2>
            <p className="text-sm text-slate-400 mt-1">Fill out the adoption form below</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">Pet Name</label>
            <input
              type="text"
              key={petName}
              defaultValue={petName || ""} 
              readOnly
              className="w-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 font-semibold px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 cursor-not-allowed outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">Your Name</label>
            <input
              type="text"
              key={session?.user?.name}
              defaultValue={session?.user?.name || ""}
              readOnly
              placeholder={isPending ? "Loading..." : "Log in to see your name"}
              className="w-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 font-semibold px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 cursor-not-allowed outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">Your Email</label>
            <input
              type="email"
              key={session?.user?.email}
              defaultValue={session?.user?.email || ""}
              readOnly
              placeholder={isPending ? "Loading..." : "Log in to see your email"}
              className="w-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 font-semibold px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 cursor-not-allowed outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">Pickup Date</label>
            <input
              type="date"
              name="pickupDate"
              required
              disabled={!session || isApproved || isPendingStatus || isOwner}
              className="w-full bg-transparent disabled:bg-slate-50 disabled:cursor-not-allowed dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">Message</label>
            <textarea
              name="message"
              rows="3"
              disabled={!session || isApproved || isPendingStatus || isOwner}
              placeholder={!session ? "Please login to write a message." : isOwner ? "You are the owner of this pet." : isPendingStatus ? "Your request is under review." : isApproved ? "This pet is no longer available." : "Why do you want to adopt this pet?"}
              className="w-full bg-transparent disabled:bg-slate-50 disabled:cursor-not-allowed dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 outline-none focus:border-pink-500 resize-none"
            ></textarea>
          </div>
        </div>

        <div className="mt-6">
          {isOwner ? (
            <button
              type="button"
              onClick={handleApproveStatus}
              disabled={isSubmitting || isApproved || !isPendingStatus}
              className="w-full font-bold py-3.5 rounded-xl shadow-md transition disabled:opacity-60 flex items-center justify-center gap-2 text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-95 disabled:from-zinc-400 disabled:to-zinc-500 disabled:cursor-not-allowed"
            >
              {isApproved ? (
                "Approved"
              ) : isPendingStatus ? (
                isSubmitting ? (
                  "Approving..."
                ) : (
                  <>
                    <FaCheck /> Approve Request
                  </>
                )
              ) : (
                "Pending"
              )}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full font-bold py-3.5 rounded-xl shadow-md transition disabled:opacity-60 flex items-center justify-center gap-2 text-white
                ${isPending ? "bg-zinc-400 dark:bg-zinc-700" : !session || isApproved || isPendingStatus ? "bg-zinc-400 dark:bg-zinc-700 cursor-not-allowed" : "bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95"}`}
            >
              {isPending ? (
                "Loading..."
              ) : isSubmitting ? (
                "Submitting..."
              ) : !session ? (
                "Please Login"
              ) : isApproved ? (
                "Approved"
              ) : isPendingStatus ? (
                "Pending"
              ) : (
                <>
                  <FaPaw /> Submit Adoption Request
                </>
              )}
            </button>
          )}
        </div>

      </form>
    </div>
  );
}