"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPaw } from "react-icons/fa";
import { HiOutlineLogout, HiMenu } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const userRole = "owner"; 

    const handleLogout = () => {
        setIsLoggedIn(false);
        toast.success("Successfully logged out!");
    };


    const isActive = (path) =>
        pathname === path
            ? "text-pink-900 dark:text-pink-300 font-bold border-b-2 border-pink-700 dark:border-pink-400 bg-transparent"
            : "text-base-content/80 hover:text-pink-600 bg-transparent";

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="navbar border-b border-pink-200/40 sticky top-0 z-50 backdrop-blur-md bg-pink-gradient bg-opacity-90 shadow-sm px-4 sm:px-6 lg:px-8"
        >
     
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden p-1 mr-2" aria-label="Open Menu">
                        <HiMenu className="text-2xl text-pink-700 dark:text-pink-300" />
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-pink-100 dark:border-pink-900/30">
                        <li><Link href="/" className={isActive("/")}>Home</Link></li>
                        <li><Link href="/pets" className={isActive("/pets")}>All Pets</Link></li>
                        {isLoggedIn && (
                            <>
                                <li><Link href="/dashboard/my-requests" className={isActive("/dashboard/my-requests")}>My Requests</Link></li>
                                {userRole === "owner" && (
                                    <li><Link href="/dashboard/add-pet" className={isActive("/dashboard/add-pet")}>Add Pet</Link></li>
                                )}
                            </>
                        )}
                    </ul>
                </div>

    
                <Link href="/" className="btn btn-ghost p-0 hover:bg-transparent flex items-center gap-2.5 normal-case group transition-all duration-300 transform active:scale-95">
                    <div className="bg-white/80 p-2 rounded-xl shadow-sm border border-pink-200/50 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                        <FaPaw className="text-pink-700 dark:text-pink-400 text-2xl drop-shadow-[0_2px_4px_rgba(219,39,119,0.2)]" />
                    </div>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-gradient-pink font-extrabold text-2xl tracking-tight filter drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]">
                            PetAdopt
                        </span>
                  
                        <span className="text-[10px] text-pink-900/60 font-semibold uppercase tracking-widest pl-0.5 mt-0.5">
                            Find Your Friend
                        </span>
                    </div>
                </Link>
            </div>

         
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2 font-semibold">
                    <li>
                        <Link href="/" className={`px-4 py-2 rounded-none ${isActive("/")}`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/pets" className={`px-4 py-2 rounded-none ${isActive("/pets")}`}>
                            All Pets
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <>
                            <li>
                                <Link href="/dashboard/my-requests" className={`px-4 py-2 rounded-none ${isActive("/dashboard/my-requests")}`}>
                                    My Requests
                                </Link>
                            </li>
                            {userRole === "owner" && (
                                <li>
                                    <Link href="/dashboard/add-pet" className={`px-4 py-2 rounded-none ${isActive("/dashboard/add-pet")}`}>
                                        Add Pet
                                    </Link>
                                </li>
                            )}
                        </>
                    )}
                </ul>
            </div>

        
            <div className="navbar-end gap-3">
                <ThemeToggle />

                {isLoggedIn ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar online ring-2 ring-pink-400/50 dark:ring-pink-500/50 ring-offset-2 ring-offset-base-100">
                            <div className="w-10 rounded-full">
                                <Image src="/avatar-placeholder.png" alt="User Avatar" width={40} height={40} className="object-cover rounded-full" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-56 border border-pink-100 dark:border-pink-900/30">
                            <li className="px-2 py-1 font-semibold text-xs text-base-content/50">Signed in as</li>
                       
                            <li className="px-2 pb-2 pt-0 font-bold text-sm text-pink-900 dark:text-pink-400 break-all border-b border-pink-100 dark:border-pink-900/20">
                                owner@example.com
                            </li>
                            <li className="mt-2">
                                <Link href="/dashboard" className="hover:text-pink-600 font-medium py-2">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="text-red-500 font-medium flex items-center gap-2 py-2 hover:bg-red-50 dark:hover:bg-red-950/20">
                                    <HiOutlineLogout className="text-lg" /> Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link href="/login" className="btn btn-primary text-white font-bold normal-case px-6 rounded-full shadow-md shadow-pink-300/30 transition-transform active:scale-95">
                        Login
                    </Link>
                )}
            </div>
        </motion.div>
    );
}