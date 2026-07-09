"use client";

import React, { useState, useEffect, useMemo } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";

function useDashboardStats(email) {
  const [stats, setStats] = useState({ activeRequests: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    if (!email) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        setLoading(true);
        const tokenResponse = await authClient.token();
        const token = tokenResponse?.data?.token || tokenResponse?.token;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard-stats?email=${email}`,
          {
            method: "GET",
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch dashboard stats");
        const data = await res.json();

        if (!isCancelled) {
          setStats({ activeRequests: data?.activeRequests || 0 });
        }
      } catch (error) {
        console.error("Dashboard stats error:", error);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchStats();
    return () => { isCancelled = true; };
  }, [email]);

  return { stats, loading };
}

export default function DashboardPage() {
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const [isMounted, setIsMounted] = useState(false);

  const userEmail = useMemo(() => session?.user?.email, [session?.user?.email]);
  const { stats, loading: isStatsLoading } = useDashboardStats(userEmail);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isSessionLoading || (userEmail && isStatsLoading)) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full"
        />
      </div>
    );
  }

  if (!session) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 text-center bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 rounded-3xl shadow-sm"
      >
        <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">
          Please log in to access your customized dashboard panel.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >

      <div className="bg-base-300/40 dark:bg-zinc-900 p-8 rounded-3xl border border-pink-100 dark:border-pink-900/50 shadow-sm">
      
        <h1 className="text-4xl font-extrabold text-pink-950 dark:text-white tracking-tight">
          Welcome back, <span className="text-pink-600">{session?.user?.name?.split(' ')[0] || "User"}</span>!
        </h1>

        <div className="mt-8 space-y-6">
          <p className="text-lg text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
            Your adoption hub is ready. Track the status of your requests, manage your pet listings, or share a new furry friend with our community—all in one place.
          </p>

          <div className="flex items-center gap-4 p-4 bg-pink-50 dark:bg-pink-950/30 rounded-2xl border border-pink-100 dark:border-pink-900/50">
            <div className="text-pink-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <p className="text-sm font-medium text-pink-900 dark:text-pink-100">
              Use the <span className="font-bold">sidebar menu</span> on the left to start exploring your dashboard sections.
            </p>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
