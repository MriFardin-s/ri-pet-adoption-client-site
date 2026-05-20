"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle, FaEnvelope, FaLock, FaPaw } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    
    useEffect(() => {
        if (!isPending && session?.user) {
            
        }
    }, [session, isPending, router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        
        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });

        if (data) {
            toast.success("Login successful! Redirecting...");
            router.push("/"); 
            router.refresh(); 
        }
        if (error) {
            toast.error(`Login failed: ${error.message}`);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/", 
            });
        } catch (err) {
            toast.error("Google login failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-300">
            <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-pink-100 dark:border-pink-950/20">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-950/50 text-pink-500 mb-3">
                        <FaPaw className="text-2xl" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-zinc-100">Welcome Back</h2>
                    <p className="text-sm text-slate-400 mt-1">Login to manage your pet adoptions</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label className="block font-bold text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider pb-1.5">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                placeholder="abc@example.com"
                                required
                                className="w-full bg-transparent dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-medium pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-slate-400/60"
                            />
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <div className="flex justify-between items-center pb-1.5">
                            <label className="block font-bold text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Password</label>
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                                className="w-full bg-transparent dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-medium pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-slate-400/60"
                            />
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3.5 rounded-xl border-none shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                        Log In
                    </button>
                </form>

                {/* Divider */}
                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-slate-200 dark:border-zinc-800"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">Or continue with</span>
                    <div className="flex-grow border-t border-slate-200 dark:border-zinc-800"></div>
                </div>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-slate-700 dark:text-zinc-200 font-bold py-3 rounded-xl border border-slate-200 dark:border-zinc-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                    <FaGoogle className="text-red-500 text-lg" />
                    <span>Continue with Google</span>
                </button>

                {/* Footer Link */}
                <p className="text-center text-sm text-slate-500 dark:text-zinc-400 mt-8">
                    Do not have an account?{" "}
                    <Link href="/signup" className="font-bold text-pink-500 hover:underline">
                        Create Account
                    </Link>
                </p>

            </div>
        </div>
    );
}