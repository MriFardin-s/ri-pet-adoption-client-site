"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { PawPrint } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

export default function AddPet() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, isMounted, router]);

  if (!isMounted || isPending) {
    return (
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
  }

  if (!session) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const petData = Object.fromEntries(formData.entries());
    petData.userEmail = session.user.email;

   const loadingToast = toast.loading("Listing Pet...", {
  style: {
    background: 'var(--background)',
    color: 'var(--foreground)',
    border: '1px solid #fbcfe8',
  },
  iconTheme: {
    primary: '#db2777',
    secondary: '#fff',
  },
});

    try {
      const tokenResponse = await authClient.token();
      const token = tokenResponse?.data?.token || tokenResponse?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: JSON.stringify(petData),
      });

      if (res.ok) {
        toast.success("Pet Added Successfully!", { id: loadingToast });
        form.reset();
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to add pet.", { id: loadingToast });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: loadingToast });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto my-8 p-6 sm:p-8 bg-white dark:bg-zinc-900 shadow-xl rounded-3xl border border-pink-100 dark:border-zinc-800"
    >
      <div className="border-b border-pink-100 dark:border-zinc-800 pb-4 mb-6 flex items-start gap-4">
        <div className="p-3 bg-pink-50 dark:bg-zinc-800 rounded-2xl text-pink-500">
          <PawPrint size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Add a New Pet</h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400">Fill in the details to find a loving home for your furry friend.</p>
        </div>
      </div>

  <form onSubmit={handleSubmit} className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col w-full md:col-span-2">
      <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">Pet Name *</label>
      <input type="text" name="petName" required placeholder="e.g., Milo, Bella" className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all" />
    </div>

    <div className="flex flex-col w-full">
      <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">Species *</label>
      <select name="species" required className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 cursor-pointer">
        <option value="">Select species</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Bird">Bird</option>
        <option value="Rabbit">Rabbit</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div className="flex flex-col w-full">
      <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">Breed *</label>
      <input type="text" name="breed" required placeholder="e.g., Golden Retriever, Persian" className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all" />
    </div>

    <div className="flex flex-col w-full">
      <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">Age *</label>
      <input type="number" name="age" required placeholder="e.g., 12" className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all" />
    </div>

    <div className="flex flex-col w-full">
      <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">Gender *</label>
      <select name="gender" required className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 cursor-pointer">
        <option value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>

    <div className="flex flex-col w-full">
      <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">Health Status *</label>
      <select name="healthStatus" required className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 cursor-pointer">
        <option value="">Select health status</option>
        <option value="Healthy">Healthy</option>
        <option value="Under Treatment">Under Treatment</option>
        <option value="Special Needs">Special Needs</option>
      </select>
    </div>

    <div className="flex flex-col w-full">
      <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">Vaccination Status *</label>
      <select name="vaccinationStatus" required className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 cursor-pointer">
        <option value="">Select vaccination status</option>
        <option value="Fully Vaccinated">Fully Vaccinated</option>
        <option value="Partially Vaccinated">Partially Vaccinated</option>
        <option value="Not Vaccinated">Not Vaccinated</option>
      </select>
    </div>

    <div className="flex flex-col w-full">
      <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">Location *</label>
      <input type="text" name="location" required placeholder="e.g., Dhaka, Khulna" className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all" />
    </div>

    <div className="flex flex-col w-full">
      <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">Adoption Fee (BDT) *</label>
      <input type="number" name="adoptionFee" required placeholder="Enter 0 if free" className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all" />
    </div>

    <div className="flex flex-col w-full md:col-span-2">
      <label className="mb-2 font-semibold text-sm text-slate-400 dark:text-zinc-500">User Email</label>
      <input type="email" disabled value={session.user.email} className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-slate-400 cursor-not-allowed text-sm" />
    </div>

    <div className="flex flex-col w-full md:col-span-2">
      <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">Image URL *</label>
      <input type="url" name="imageUrl" required placeholder="Paste image link here" className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all" />
    </div>

    <div className="flex flex-col w-full md:col-span-2">
      <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">Description *</label>
      <textarea name="description" required placeholder="Tell us about the pet..." className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-3xl min-h-[120px] focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all resize-y"></textarea>
    </div>
  </div>

  <button type="submit" className="w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold tracking-wide shadow-lg py-4 transition-all hover:opacity-90">
    Submit Pet for Adoption
  </button>
</form>
    </motion.div>
  );
}