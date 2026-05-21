"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { HiOutlineClipboardList, HiOutlinePlusCircle } from "react-icons/hi";
import { MdOutlinePets } from "react-icons/md";
import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const userRole = session?.user ? "owner" : "guest";

  const menuItems = [
    { 
      key: "/dashboard/my-requests", 
      label: "My Requests", 
      icon: <HiOutlineClipboardList className="text-xl" />, 
      show: !!session?.user
    },
    { 
      key: "/dashboard/add-pet", 
      label: "Add New Pet", 
      icon: <HiOutlinePlusCircle className="text-xl" />, 
      show: userRole === "owner" 
    },
    { 
      key: "/dashboard/my-listings", 
      label: "My Pet Listings", 
      icon: <MdOutlinePets className="text-xl" />, 
      show: userRole === "owner" 
    }
  ];

  if (isPending) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
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
            className="text-sm font-medium text-slate-400"
          >
            Loading dashboard...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          <motion.aside 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="w-full md:w-64 shrink-0"
          >
            <div className="bg-base-200 p-4 rounded-2xl border border-pink-200 dark:border-pink-950 shadow-sm">
              <h2 className="text-sm font-bold text-pink-700/60 dark:text-pink-300/60 uppercase tracking-wider px-3 mb-4 hidden md:block">
                Control Panel
              </h2>
              
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none">
                {menuItems.filter(item => item.show).map((item) => {
                  const active = pathname === item.key;
                  return (
                    <Link 
                      key={item.key} 
                      href={item.key}
                      className="relative flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors text-sm whitespace-nowrap min-w-max md:w-full z-10"
                    >
                      {active && (
                        <motion.div 
                          layoutId="activeDashboardNav"
                          className="absolute inset-0 bg-pink-600 dark:bg-pink-700 rounded-xl -z-10 shadow-md"
                          transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        />
                      )}
                      
                      <span className={active ? "text-white" : "text-pink-600 dark:text-pink-400"}>
                        {item.icon}
                      </span>
                      
                      <span className={active ? "text-white" : "text-pink-900 dark:text-pink-100 hover:text-pink-600 dark:hover:text-pink-300"}>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.aside>

          <motion.main 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="flex-1 bg-base-200 p-6 rounded-2xl border border-pink-200 dark:border-pink-950 shadow-sm min-h-[60vh]"
          >
            {children}
          </motion.main>

        </div>
      </div>
    </div>
  );
}