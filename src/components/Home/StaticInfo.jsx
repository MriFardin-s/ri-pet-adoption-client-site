"use client";

import Image from "next/image";
import React from "react";
import { HiOutlineCheckCircle, HiOutlineStar } from "react-icons/hi";

export default function StaticInfo() {
  return (
    <>
      <section className="bg-base-200 border-y border-pink-100 dark:border-pink-950 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-md mx-auto lg:max-w-none w-full aspect-square lg:h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1484156818044-c040038b0719?q=80&w=800"
              alt="Why Adopt"
              className="w-full h-full object-cover rounded-3xl shadow-md"
              width={800}
              height={800}
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-pink-950 dark:text-pink-100">Why You Should Adopt Instead of Buy?</h2>
            <p className="text-neutral-600 dark:text-pink-100/70 font-medium">
              Adoption is an act of pure love. Every time you adopt a pet from an shelter, you save two lives: the animal you take home and the next homeless pet that takes its place in the shelter.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <HiOutlineCheckCircle className="text-pink-600 dark:text-pink-400 text-xl shrink-0 mt-0.5" />
                <p className="font-semibold text-pink-950 dark:text-pink-200 text-sm sm:text-base">You save an innocent, vulnerable life from loneliness.</p>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineCheckCircle className="text-pink-600 dark:text-pink-400 text-xl shrink-0 mt-0.5" />
                <p className="font-semibold text-pink-950 dark:text-pink-200 text-sm sm:text-base">All our animals are fully health checked and vaccinated.</p>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineCheckCircle className="text-pink-600 dark:text-pink-400 text-xl shrink-0 mt-0.5" />
                <p className="font-semibold text-pink-950 dark:text-pink-200 text-sm sm:text-base">You fight against illegal commercial backyard breeders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-pink-950 dark:text-pink-100">Our Heartwarming Success Stories</h2>
          <p className="text-neutral-500 dark:text-pink-100/60 mt-2 font-medium">Real stories from wonderful families who found their perfect match through us.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-base-200 p-6 sm:p-8 rounded-3xl border border-pink-200/50 dark:border-pink-950 flex flex-col sm:flex-row gap-6 items-center">
            <Image 
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=300" 
              alt="Story 1" 
              className="w-28 h-28 object-cover rounded-full border-4 border-pink-200 dark:border-pink-900"
              width={120}
              height={120}
            />
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex justify-center sm:justify-start text-amber-400 gap-0.5">
                <HiOutlineStar/><HiOutlineStar/><HiOutlineStar/><HiOutlineStar/><HiOutlineStar/>
              </div>
              <p className="text-sm italic text-neutral-600 dark:text-pink-100/70 font-medium">Adopting Daisy was the best decision our family ever made. She brought so much laughter and positive energy back into our house!</p>
              <h4 className="font-bold text-pink-950 dark:text-pink-200 text-sm">- The Rahman Family</h4>
            </div>
          </div>
          <div className="bg-base-200 p-6 sm:p-8 rounded-3xl border border-pink-200/50 dark:border-pink-950 flex flex-col sm:flex-row gap-6 items-center">
            <Image 
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=300" 
              alt="Story 2" 
              className="w-28 h-28 object-cover rounded-full border-4 border-pink-200 dark:border-pink-900"
              width={120}
              height={120}
            />
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex justify-center sm:justify-start text-amber-400 gap-0.5">
                <HiOutlineStar/><HiOutlineStar/><HiOutlineStar/><HiOutlineStar/><HiOutlineStar/>
              </div>
              <p className="text-sm italic text-neutral-600 dark:text-pink-100/70 font-medium">Milo was very shy at first, but with patience, he is now the most affectionate cat. Thank you PetAdopt for making this process smooth.</p>
              <h4 className="font-bold text-pink-950 dark:text-pink-200 text-sm">- Tanvir Ahmed</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-200 border-y border-pink-100 dark:border-pink-950 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-pink-950 dark:text-pink-100">Essential Pet Care Tips</h2>
            <p className="text-neutral-500 dark:text-pink-100/60 mt-2 font-medium">New to pet parenting? Follow these basic health guidelines to keep your companion healthy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-base-100 p-6 rounded-2xl border border-pink-100 dark:border-pink-950/50">
              <span className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/60 flex items-center text-pink-600 dark:text-pink-400 font-bold mb-4 mx-auto md:mx-0 justify-center">01</span>
              <h3 className="text-lg font-bold text-pink-950 dark:text-pink-200">Balanced Nutrition</h3>
              <p className="text-sm text-neutral-500 dark:text-pink-100/60 mt-2 font-medium">Always provide age-appropriate food. Clean, fresh water must be accessible at all times to avoid urinary infections.</p>
            </div>
            <div className="bg-base-100 p-6 rounded-2xl border border-pink-100 dark:border-pink-950/50">
              <span className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/60 flex items-center text-pink-600 dark:text-pink-400 font-bold mb-4 mx-auto md:mx-0 justify-center">02</span>
              <h3 className="text-lg font-bold text-pink-950 dark:text-pink-200">Regular Vet Visits</h3>
              <p className="text-sm text-neutral-500 dark:text-pink-100/60 mt-2 font-medium">Ensure your companion receives annual vaccination boosters and routine deworming treatments to track immunity.</p>
            </div>
            <div className="bg-base-100 p-6 rounded-2xl border border-pink-100 dark:border-pink-950/50">
              <span className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/60 flex items-center text-pink-600 dark:text-pink-400 font-bold mb-4 mx-auto md:mx-0 justify-center">03</span>
              <h3 className="text-lg font-bold text-pink-950 dark:text-pink-200">Mental Stimulation</h3>
              <p className="text-sm text-neutral-500 dark:text-pink-100/60 mt-2 font-medium">Spend at least 30 minutes daily playing or walking. Active interaction reduces stress and behavioral anxieties.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}