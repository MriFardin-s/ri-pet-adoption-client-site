"use client";

import React from "react";
import { HiOutlineCalendar } from "react-icons/hi"; 

export default function AdoptionEvents() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-pink-950 dark:text-pink-100">Upcoming Adoption Events</h2>
        <p className="text-neutral-500 dark:text-pink-100/60 mt-2 font-medium">Come over to meet our pets live, talk with experts, and complete on-spot adoption processes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    
        <div className="bg-base-200 p-6 rounded-2xl border border-pink-200/50 dark:border-pink-950 flex gap-4 items-start">
          <div className="p-3 bg-pink-600 text-white rounded-xl text-center font-bold shrink-0 min-w-[65px]">
            <span className="block text-xl leading-none">25</span>
            <span className="text-xs uppercase tracking-wider mt-1 block">May</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-pink-950 dark:text-pink-200 flex items-center gap-2">
              <HiOutlineCalendar className="text-pink-600 dark:text-pink-400" /> Weekend Adoption Camp
            </h3>
            <p className="text-xs font-semibold text-pink-600 dark:text-pink-400">10:00 AM - 04:00 PM | Central Public Park</p>
            <p className="text-sm text-neutral-500 dark:text-pink-100/60 pt-1 font-medium">A perfect family day out to meet over 20+ adorable rescued dogs and cats looking for shelter.</p>
          </div>
        </div>

        <div className="bg-base-200 p-6 rounded-2xl border border-pink-200/50 dark:border-pink-950 flex gap-4 items-start">
          <div className="p-3 bg-pink-600 text-white rounded-xl text-center font-bold shrink-0 min-w-[65px]">
            <span className="block text-xl leading-none">07</span>
            <span className="text-xs uppercase tracking-wider mt-1 block">Jun</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-pink-950 dark:text-pink-200 flex items-center gap-2">
              <HiOutlineCalendar className="text-pink-600 dark:text-pink-400" /> Feline Love Meetup
            </h3>
            <p className="text-xs font-semibold text-pink-600 dark:text-pink-400">02:00 PM - 06:00 PM | PetAdopt Headquarters</p>
            <p className="text-sm text-neutral-500 dark:text-pink-100/60 pt-1 font-medium">Dedicated solely to cat lovers! Free adoption counseling and basic cat training kit distributions available.</p>
          </div>
        </div>
      </div>
    </section>
  );
}