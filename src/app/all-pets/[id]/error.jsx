"use client";

import React from "react";
import Link from "next/link";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-pink-50 to-white dark:from-zinc-950 dark:to-zinc-900 p-6 text-center">
            <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-3xl flex items-center justify-center text-4xl mb-6">
                <HiOutlineExclamationCircle />
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-pink-950 dark:text-zinc-100 mb-4">
                Oops! Something went wrong
            </h1>

            <p className="text-slate-600 dark:text-zinc-400 max-w-md mb-8">
                We could not find the page you are looking for or an error occurred. Please try going back to the dashboard or home.
            </p>

            <Link href="/" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-lg hover:opacity-90 transition-all active:scale-95">
                Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;