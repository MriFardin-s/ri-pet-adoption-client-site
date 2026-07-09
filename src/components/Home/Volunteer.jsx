"use client";

import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi";

export default function Volunteer() {
  return (
    <section className="bg-gradient-to-tr from-pink-50 to-pink-100/40 dark:from-pink-950/10 dark:to-base-200 border-t border-pink-100 dark:border-pink-950 py-16 sm:py-20 text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-pink-200/60 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center text-2xl mx-auto">
          <HiOutlineUserGroup />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-pink-950 dark:text-pink-100">Not Ready to Adopt? Volunteer Instead!</h2>
        <p className="text-neutral-600 dark:text-pink-100/70 font-medium max-w-xl mx-auto text-sm sm:text-base">
          You can still make a huge impact. Join our passionate community to help us manage shelter cleaning, feed the animals, or handle fundraising drives.
        </p>
        <div className="pt-2 flex justify-center">
          <button className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-sm transition-all hover:opacity-95 active:scale-[0.98] flex items-center justify-center gap-1.5"
          >
            Join Our Crew
          </button>
        </div>
      </div>
    </section>
  );
}