"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { PawPrint } from "lucide-react";
import { authClient } from "@/lib/auth-client"; 
import { motion } from "framer-motion";

export default function AddPet() {
  const { data: session, isPending } = authClient.useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isPending) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full"
          />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-zinc-500">
        Please log in to add a pet.
      </div>
    );
  }

  const currentUserEmail = session.user.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget; 
    const formData = new FormData(form);
    const petData = Object.fromEntries(formData.entries());
    petData.userEmail = currentUserEmail; 

    const loadingToast = toast.loading("Listing Pet...");

    const {data: tokenData} = await authClient.token();
  

    try {
      const res = await fetch("http://localhost:9000/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${tokenData?.token}`
      
        },
        body: JSON.stringify(petData),
      });

      if (res.ok) {
        toast.success("Pet Added Successfully!", { id: loadingToast });
        form.reset(); 
      } else {
        toast.error("Failed to add pet.", { id: loadingToast });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", { id: loadingToast });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto my-8 p-6 sm:p-8 bg-white dark:bg-zinc-900 shadow-xl rounded-3xl border border-pink-100 dark:border-zinc-800"
    >
      <div className="border-b border-pink-100 dark:border-zinc-800 pb-4 mb-6 flex items-start gap-4">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="p-3 bg-pink-50 dark:bg-zinc-800 rounded-2xl text-pink-500"
        >
          <PawPrint size={28} />
        </motion.div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Add a New Pet</h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400">Fill in the details to find a loving home for your furry friend.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full md:col-span-2">
            <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">
              Pet Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="petName"
              required
              placeholder="e.g., Milo, Bella"
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">
              Species <span className="text-rose-500">*</span>
            </label>
            <select
              name="species"
              required
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 shadow-sm transition-all cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled className="text-slate-400 dark:bg-zinc-800">Select species</option>
              <option value="Dog" className="dark:bg-zinc-800">Dog</option>
              <option value="Cat" className="dark:bg-zinc-800">Cat</option>
              <option value="Bird" className="dark:bg-zinc-800">Bird</option>
              <option value="Rabbit" className="dark:bg-zinc-800">Rabbit</option>
              <option value="Other" className="dark:bg-zinc-800">Other</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">
              Breed <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="breed"
              required
              placeholder="e.g., Golden Retriever, Persian"
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">
              Age (in months/years) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              required
              placeholder="e.g., 12"
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">
              Gender <span className="text-rose-500">*</span>
            </label>
            <select
              name="gender"
              required
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 shadow-sm transition-all cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled className="text-slate-400 dark:bg-zinc-800">Select gender</option>
              <option value="Male" className="dark:bg-zinc-800">Male</option>
              <option value="Female" className="dark:bg-zinc-800">Female</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">
              Health Status <span className="text-rose-500">*</span>
            </label>
            <select
              name="healthStatus"
              required
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 shadow-sm transition-all cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled className="text-slate-400 dark:bg-zinc-800">Select health status</option>
              <option value="Healthy" className="dark:bg-zinc-800">Healthy</option>
              <option value="Under Treatment" className="dark:bg-zinc-800">Under Treatment</option>
              <option value="Special Needs" className="dark:bg-zinc-800">Special Needs</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">
              Vaccination Status <span className="text-rose-500">*</span>
            </label>
            <select
              name="vaccinationStatus"
              required
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 shadow-sm transition-all cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled className="text-slate-400 dark:bg-zinc-800">Select vaccination status</option>
              <option value="Fully Vaccinated" className="dark:bg-zinc-800">Fully Vaccinated</option>
              <option value="Partially Vaccinated" className="dark:bg-zinc-800">Partially Vaccinated</option>
              <option value="Not Vaccinated" className="dark:bg-zinc-800">Not Vaccinated</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">
              Location <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              required
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">
              Adoption Fee (BDT) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              name="adoptionFee"
              required
              placeholder="Enter 0 if free"
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all"
            />
          </div>

          <div className="flex flex-col w-full md:col-span-2">
            <label className="mb-2 font-semibold text-sm text-slate-400 dark:text-zinc-500">
              User Email (Active Session)
            </label>
            <input
              type="email"
              disabled
              value={currentUserEmail || "Not Logged In"}
              className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-slate-400 border-dashed cursor-not-allowed focus:outline-none text-sm"
            />
          </div>

          <div className="flex flex-col w-full md:col-span-2">
            <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">
              Image URL <span className="text-rose-500">*</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              required
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all"
            />
          </div>

          <div className="flex flex-col w-full md:col-span-2">
            <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">
              Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="description"
              required
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-3xl min-h-[120px] focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all resize-y"
            ></textarea>
          </div>
        </div>

        <motion.button
          whileHover={{ opacity: 0.95 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={!currentUserEmail}
          className="w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold tracking-wide shadow-lg py-4 transition-all flex items-center justify-center gap-2 disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500"
        >
          Submit Pet for Adoption
        </motion.button>
      </form>
    </motion.div>
  );
}