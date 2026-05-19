"use client";

import React, { useState } from "react";
import { FaPaw, FaUser, FaEnvelope } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function AdoptForm({ petName }) {
  const [isSubmitting, setIsSubmitting] = useState(false);


  const loggedInUser = {
    name: "Fardin",
    email: "fardin@example.com",
  };

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    

    const adoptionRequest = {
      petName: petName, 
      userName: loggedInUser.name, 
      userEmail: loggedInUser.email, 
      pickupDate: formData.get("pickupDate"),
      message: formData.get("message"),
      status: "pending", 
    };

    try {
    
      
      console.log("Submitting to DB:", adoptionRequest);


      toast.success(`Adoption request for ${petName} submitted successfully!`);
      e.target.reset(); 
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-pink-100 dark:border-pink-950/20 sticky top-24">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-slate-800 dark:text-zinc-100">Adopt {petName}</h2>
        <p className="text-xs text-slate-400 mt-1">Fill out the request details to proceed</p>
      </div>

      <form onSubmit={handleAdoptSubmit} className="space-y-4">
        {/* ১. Pet Name */}
        <div>
          <label className="label font-bold text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider pb-1">Pet Name</label>
          <div className="relative">
            <input
              type="text"
              value={petName}
              readOnly
              className="w-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 font-semibold px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 cursor-not-allowed focus:outline-none"
            />
            <FaPaw className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          </div>
        </div>

        {/* ২. User Name  */}
        <div>
          <label className="label font-bold text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider pb-1">Your Name</label>
          <div className="relative">
            <input
              type="text"
              value={loggedInUser.name}
              readOnly
              className="w-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 font-semibold px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 cursor-not-allowed focus:outline-none"
            />
            <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          </div>
        </div>

        {/* ৩. User Email */}
        <div>
          <label className="label font-bold text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider pb-1">Your Email</label>
          <div className="relative">
            <input
              type="email"
              value={loggedInUser.email}
              readOnly
              className="w-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 font-semibold px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 cursor-not-allowed focus:outline-none"
            />
            <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          </div>
        </div>

        {/* ৪. Pickup Date */}
        <div>
          <label className="label font-bold text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider pb-1">
            Target Pickup Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="pickupDate"
            required
            className="w-full bg-transparent dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-medium px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 focus:outline-none focus:border-pink-500 dark:focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          />
        </div>

        {/* ৫. Message */}
        <div>
          <label className="label font-bold text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider pb-1">Message to Owner</label>
          <textarea
            name="message"
            rows="3"
            placeholder="Why do you want to adopt this pet? Share your thoughts..."
            className="w-full bg-transparent dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-medium px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 focus:outline-none focus:border-pink-500 dark:focus:border-pink-500 focus:ring-1 focus:ring-pink-500 placeholder:text-slate-400/70"
          ></textarea>
        </div>

        {/* ৬. Adopt Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 btn bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold normal-case py-3.5 rounded-xl border-none shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <>
              <FaPaw className="text-base" /> Adopt Now
            </>
          )}
        </button>
      </form>
    </div>
  );
}