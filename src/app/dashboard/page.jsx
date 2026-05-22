"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

function useDashboardStats(email) {
  const [stats, setStats] = useState({
    activeRequests: 0,
    myListings: 0,
    adoptedPets: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          `http://localhost:9000/dashboard-stats?email=${email}`,
          {
            method: "GET",
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }

        const data = await res.json();

        setStats({
          activeRequests: data?.activeRequests || 0,
          myListings: data?.myListings || 0,
          adoptedPets: data?.adoptedPets || 0,
        });
      } catch (error) {
        console.error("Dashboard stats error:", error);

        setStats({
          activeRequests: 0,
          myListings: 0,
          adoptedPets: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [email]);

  return { stats, loading };
}

export default function DashboardPage() {
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  const [isMounted, setIsMounted] = useState(false);

  const userEmail = session?.user?.email;

  const { stats, loading: isStatsLoading } =
    useDashboardStats(userEmail);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (
    !isMounted ||
    isSessionLoading ||
    (userEmail && isStatsLoading)
  ) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-black text-pink-700 dark:text-pink-400">
          Welcome back, {session?.user?.name || "User"}!
        </h1>

        <p className="text-pink-950/70 dark:text-pink-100/70 font-medium text-sm mt-1">
          Select an option from the sidebar panel to manage your pet adoption
          requests, listings, or add a new pet.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2"
      >
        <StatCard
          title="MY ADOPTION REQUESTS"
          value={stats.activeRequests}
        />

        <StatCard
          title="MY PET LISTINGS"
          value={stats.myListings}
        />

        <StatCard
          title="ADOPTION REQUESTS APPROVED"
          value={stats.adoptedPets}
        />
      </motion.div>
    </motion.div>
  );
}

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-base-300/40 dark:bg-pink-950/20 p-5 rounded-2xl border border-pink-200 dark:border-pink-900/30 transition-all shadow-sm"
    >
      <span className="text-[11px] font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">
        {title}
      </span>

      <p className="text-3xl font-black text-pink-950 dark:text-white mt-2">
        {value}
      </p>
    </motion.div>
  );
}