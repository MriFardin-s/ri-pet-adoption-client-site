"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import AdoptForm from "@/components/AdoptForm";
import { motion } from "framer-motion";
import { FaPaw } from "react-icons/fa";

export default function AdoptionContainer({ petId, session, petOwnerEmail, isOwner, petStatus, petName }) {
  const [userRequestStatus, setUserRequestStatus] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchUserStatus = async () => {
    if (!session?.user?.email || !petId) {
      setLoading(false);
      return;
    }

    try {
      const tokenResponse = await authClient.token();
      const token = tokenResponse?.data?.token || tokenResponse?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/adoptions/user-status?petId=${petId}&email=${session.user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch status");

      const data = await res.json();
      setUserRequestStatus(data.status);
    } catch (err) {
      console.error("Error fetching user status:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchUserStatus();
}, [session, petId]);

  if (loading) return (
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

  if (isOwner) {
    return (
      <div className="bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900/50 p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm h-full">
        <FaPaw className="text-5xl text-pink-500 mb-6" />
        <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 mb-2">This is your listing</h3>
      </div>
    );
  }

  if (petStatus?.toLowerCase() === "adopted" && userRequestStatus !== "approved") {
    return (
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-8 rounded-3xl text-center shadow-sm h-full flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-red-600 mb-2">Not Available</h3>
        <p className="text-red-500">Sorry, this pet has already been adopted by someone else.</p>
      </div>
    );
  }

  if (userRequestStatus === "pending") {
    return (
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-8 rounded-3xl text-center shadow-sm h-full flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-amber-600 mb-2">Request Pending</h3>
        <p className="text-amber-500">Your adoption request is currently under review.</p>
      </div>
    );
  }

  if (userRequestStatus === "approved") {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-8 rounded-3xl text-center shadow-sm h-full flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-100 mb-2">Request Approved!</h3>
        <p className="text-emerald-600">Congratulations, you are the new owner!</p>
      </div>
    );
  }

  return (
    <AdoptForm
      key={petId}
      petName={petName}
      petId={petId}
      petStatus={petStatus}
      ownerEmail={petOwnerEmail}
      isOwner={isOwner}
    />
  );
}