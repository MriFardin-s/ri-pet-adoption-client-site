"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaPaw } from "react-icons/fa";
import { HiOutlineLogout, HiMenu } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    const { data: session, isPending } = authClient.useSession();
    
   
    const isLoggedIn = session && session.user ? true : false;

    const userEmail = session?.user?.email || "";
    const userRole = "owner"; 

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Successfully logged out!");
                    router.push("/");
                    router.refresh();
                }
            }
        });
    };

    const isActive = (path) =>
        pathname === path
            ? "text-pink-700 dark:text-pink-300 font-bold border-b-2 border-pink-600 dark:border-pink-400"
            : "text-slate-700 dark:text-slate-200 hover:text-pink-600 dark:hover:text-pink-400";

  
    const getAuthButtonStyle = (path) => {
        const isCurrent = pathname === path;
        
    
        if (isCurrent) {
            return "bg-gradient-to-r from-pink-600 to-rose-500 text-white font-bold px-5 h-10 rounded-xl shadow-md shadow-pink-500/20 transition-all duration-200 flex items-center justify-center text-sm active:scale-[0.98]";
        }
        
       
        return "bg-transparent text-pink-600 dark:text-pink-400 font-bold border-2 border-pink-500/80 dark:border-pink-500/50 hover:bg-pink-50 dark:hover:bg-pink-950/20 px-5 h-10 rounded-xl transition-all duration-200 flex items-center justify-center text-sm active:scale-[0.98]";
    };

    console.log("Navbar Auth State:", { mounted, isPending, isLoggedIn, session });

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full border-b border-pink-200/30 sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-pink-50 via-white to-pink-50 dark:from-[#2A0813] dark:via-[#1A040B] dark:to-[#2A0813] bg-opacity-95 shadow-sm px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16 w-full">

                {/* LOGO & MOBILE HAMBURGER MENU */}
                <div className="flex items-center gap-2">
                    <div className="dropdown lg:hidden block">
                        <label tabIndex={0} className="btn btn-ghost p-1 mr-1 flex items-center justify-center" aria-label="Open Menu">
                            <HiMenu className="text-2xl text-pink-700 dark:text-pink-300" />
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52 border border-pink-100 dark:border-pink-900/30">
                            <li><Link href="/" className={`py-2 ${isActive("/")}`}>Home</Link></li>
                            <li><Link href="/all-pets" className={`py-2 ${isActive("/all-pets")}`}>All Pets</Link></li>
                            
                            {/* Mobile Views */}
                            {mounted && !isPending && (
                                isLoggedIn ? (
                                    <>
                                        <li><Link href="/dashboard/my-requests" className={`py-2 ${isActive("/dashboard/my-requests")}`}>My Requests</Link></li>
                                        {userRole === "owner" && (
                                            <li><Link href="/dashboard/add-pet" className={`py-2 ${isActive("/dashboard/add-pet")}`}>Add Pet</Link></li>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="divider my-1"></div>
                                        <li><Link href="/login" className="py-2 text-center font-bold text-pink-600">Login</Link></li>
                                        <li><Link href="/signup" className="py-2 text-center font-bold text-pink-600">Sign Up</Link></li>
                                    </>
                                )
                            )}
                        </ul>
                    </div>

                    <Link href="/" className="flex items-center gap-2.5 normal-case group transition-all duration-300 transform active:scale-95">
                        <div className="bg-white/90 p-2 rounded-xl shadow-sm border border-pink-200/50 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                            <FaPaw className="text-pink-600 dark:text-pink-400 text-xl sm:text-2xl drop-shadow-[0_2px_4px_rgba(219,39,119,0.2)]" />
                        </div>
                        <div className="flex flex-col items-start leading-none">
                            <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent font-extrabold text-xl sm:text-2xl tracking-tight">
                                PetAdopt
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-pink-800/70 dark:text-pink-300/60 font-semibold uppercase tracking-widest pl-0.5 mt-0.5 whitespace-nowrap">
                                Find Your Friend
                            </span>
                        </div>
                    </Link>
                </div>

                {/* DESKTOP NAVIGATION LINKS */}
                <div className="hidden lg:flex items-center">
                    <ul className="flex items-center gap-6 font-semibold text-sm">
                        <li>
                            <Link href="/" className={`px-2 py-1 transition-all ${isActive("/")}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/all-pets" className={`px-2 py-1 transition-all ${isActive("/all-pets")}`}>
                                All Pets
                            </Link>
                        </li>
                        {mounted && !isPending && isLoggedIn && (
                            <>
                                <li>
                                    <Link href="/dashboard/my-requests" className={`px-2 py-1 transition-all ${isActive("/dashboard/my-requests")}`}>
                                        My Requests
                                    </Link>
                                </li>
                                {userRole === "owner" && (
                                    <li>
                                        <Link href="/dashboard/add-pet" className={`px-2 py-1 transition-all ${isActive("/dashboard/add-pet")}`}>
                                            Add Pet
                                        </Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                </div>

                {/* RIGHT SIDE OPTIONS */}
                <div className="flex items-center gap-3">
                    {mounted && <ThemeToggle />}

                    {mounted && !isPending && (
                        isLoggedIn ? (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar online ring-2 ring-pink-400/50 dark:ring-pink-500/50 ring-offset-2 ring-offset-base-100 cursor-pointer">
                                    <div className="w-10 h-10 rounded-full overflow-hidden relative">
                                        <Image
                                            src={session?.user?.image && session.user.image.trim() !== "" ? session.user.image : "https://api.dicebear.com/7.x/initials/svg?seed=User"}
                                            referrerPolicy="no-referrer"
                                            alt="User Avatar"
                                            width={40}
                                            height={40}
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-3 shadow bg-base-100 rounded-box w-56 border border-pink-100 dark:border-pink-900/30">
                                    <li className="px-2 py-1 font-semibold text-xs text-base-content/50">Signed in as</li>
                                    <li className="px-2 pb-2 pt-0 font-bold text-sm text-pink-700 dark:text-pink-400 break-all border-b border-pink-100 dark:border-pink-900/20">
                                        {userEmail}
                                    </li>
                                    <li className="mt-2">
                                        <Link href="/dashboard" className="hover:text-pink-600 font-medium py-2 block">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="text-red-500 font-medium flex items-center gap-2 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 w-full text-left">
                                            <HiOutlineLogout className="text-lg" /> Log Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login" className={getAuthButtonStyle("/login")}>
                                    Login
                                </Link>
                                <Link href="/signup" className={getAuthButtonStyle("/signup")}>
                                    Sign Up
                                </Link>
                            </div>
                        )
                    )}
                </div>

            </div>
        </motion.div>
    );
}