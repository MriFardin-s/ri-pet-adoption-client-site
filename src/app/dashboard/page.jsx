"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";

function useDashboardStats(email) {
  const [stats, setStats] = React.useState({ activeRequests: 0, myListings: 0, adoptedPets: 0 });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!email) return;


    fetch(`http://localhost:9000/pets/my-listings?email=${encodeURIComponent(email)}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((listings) => {
        const total = listings.length;
        const adopted = listings.filter((p) => p.status === "adopted").length;
        

        setStats({
          activeRequests: total - adopted, 
          myListings: total,
          adoptedPets: adopted,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard stats:", err);
        setLoading(false);
      });
  }, [email]);

  return { stats, loading };
}

export default function DashboardPage() {
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const userEmail = session?.user?.email;

  const { stats, loading: isStatsLoading } = useDashboardStats(userEmail);

  if (isSessionLoading || (userEmail && isStatsLoading)) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg text-pink-600"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-6 text-center bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 rounded-3xl">
        <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">
          Please log in to access your customized dashboard panel.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-pink-700 dark:text-pink-400">
          Welcome back, {session?.user?.name || "User"}!
        </h1>
        <p className="text-pink-950/70 dark:text-pink-100/70 font-medium text-sm mt-1">
          Select an option from the sidebar panel to manage your pet adoption requests, listings, or add a new pet.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        {/* Active Requests */}
        <div className="bg-base-300/40 dark:bg-pink-950/20 p-5 rounded-2xl border border-pink-200 dark:border-pink-900/30 transition-all shadow-sm">
          <span className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">Active Requests</span>
          <p className="text-3xl font-black text-pink-950 dark:text-white mt-2">
            {stats.activeRequests}
          </p>
        </div>
        
        {/* My Listings */}
        <div className="bg-base-300/40 dark:bg-pink-950/20 p-5 rounded-2xl border border-pink-200 dark:border-pink-900/30 transition-all shadow-sm">
          <span className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">My Listings</span>
          <p className="text-3xl font-black text-pink-950 dark:text-white mt-2">
            {stats.myListings}
          </p>
        </div>
        
        {/* Adopted Pets */}
        <div className="bg-base-300/40 dark:bg-pink-950/20 p-5 rounded-2xl border border-pink-200 dark:border-pink-900/30 transition-all shadow-sm">
          <span className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">Adopted Pets</span>
          <p className="text-3xl font-black text-pink-950 dark:text-white mt-2">
            {stats.adoptedPets}
          </p>
        </div>
      </div>
    </div>
  );
}