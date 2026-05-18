'use client';

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { PawPrint } from "lucide-react";

export default function AddPet() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formData.entries());
    console.log("Submitting pet data:", petData);

    try {
      const res = await fetch("http://localhost:9000/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (res.ok) {
        toast.success(" Pet Added Successfully!");
        e.target.reset();
      } else {
        toast.error("Failed to add pet.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 sm:p-8 bg-white dark:bg-zinc-900 shadow-xl rounded-3xl border border-pink-100 dark:border-zinc-800">

      {/* Header Section */}
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

          {/* Pet Name */}
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

          {/* Species */}
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
              <option value="" disabled className="text-slate-400">Select species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Breed */}
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

          {/* Age */}
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

          {/* Gender */}
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
              <option value="" disabled className="text-slate-400">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Health Status */}
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
              <option value="" disabled className="text-slate-400">Select health status</option>
              <option value="Healthy">Healthy</option>
              <option value="Under Treatment">Under Treatment</option>
              <option value="Special Needs">Special Needs</option>
            </select>
          </div>

          {/* Vaccination Status */}
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
              <option value="" disabled className="text-slate-400">Select vaccination status</option>
              <option value="Fully Vaccinated">Fully Vaccinated</option>
              <option value="Partially Vaccinated">Partially Vaccinated</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
            </select>
          </div>

          {/* Location */}
          <div className="flex flex-col w-full">
            <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">
              Location <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              required
              placeholder="e.g., Banani, Dhaka"
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all"
            />
          </div>

          {/* Adoption Fee */}
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

          {/* Owner Email */}
          <div className="flex flex-col w-full md:col-span-2">
            <label className="mb-2 font-semibold text-sm text-slate-400 dark:text-zinc-500">
              Owner Email
            </label>
            <input
              type="email"
              name="ownerEmail"
              readOnly
              defaultValue="owner@example.com"
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-slate-400 border-dashed cursor-not-allowed focus:outline-none"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col w-full md:col-span-2">
            <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">
              Image URL <span className="text-rose-500">*</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              required
              placeholder="https://example.com/pet.jpg"
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-2xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col w-full md:col-span-2">
            <label className="mb-2 font-semibold text-sm text-slate-700 dark:text-zinc-200">
              Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="description"
              required
              placeholder="Describe the pet's personality and needs..."
              className="w-full px-4 py-3 border border-pink-200 dark:border-zinc-700 rounded-3xl min-h-[120px] focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all resize-y"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold tracking-wide shadow-lg py-4 transition-all hover:opacity-90 active:scale-[0.99] flex items-center justify-center gap-2 disabled:bg-zinc-300"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              <span>Listing Pet...</span>
            </div>
          ) : (
            "Submit Pet for Adoption"
          )}
        </button>
      </form>
    </div>
  );
}