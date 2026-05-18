"use client";

import React from "react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-pink-700 dark:text-pink-400">
        Welcome to your Dashboard!
      </h1>
      <p className="text-pink-950/70 dark:text-pink-100/70 font-medium text-sm">
        Select an option from the sidebar panel to manage your pet adoption requests, listings, or add a new pet.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="bg-base-300/40 dark:bg-pink-950/20 p-5 rounded-2xl border border-pink-200 dark:border-pink-900/30 transition-all">
          <span className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">Active Requests</span>
          <p className="text-3xl font-black text-pink-950 dark:text-white mt-2">3</p>
        </div>
        
        <div className="bg-base-300/40 dark:bg-pink-950/20 p-5 rounded-2xl border border-pink-200 dark:border-pink-900/30 transition-all">
          <span className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">My Listings</span>
          <p className="text-3xl font-black text-pink-950 dark:text-white mt-2">5</p>
        </div>
        
        <div className="bg-base-300/40 dark:bg-pink-950/20 p-5 rounded-2xl border border-pink-200 dark:border-pink-900/30 transition-all">
          <span className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">Adopted Pets</span>
          <p className="text-3xl font-black text-pink-950 dark:text-white mt-2">12</p>
        </div>
      </div>
    </div>
  );
}