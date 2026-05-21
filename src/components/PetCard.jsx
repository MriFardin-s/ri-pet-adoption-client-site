"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PawPrint, Heart } from "lucide-react";
import Image from "next/image";

export default function PetCard({ pet }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-zinc-900 border border-pink-100/70 dark:border-zinc-800/80 rounded-3xl shadow-sm hover:shadow-xl overflow-hidden flex flex-col group"
    >
      <div className="relative h-56 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={
            pet.imageUrl ||
            pet.image ||
            "https://placehold.co/600x400?text=Pet"
          }
          alt={pet.petName || "Pet"}
          width={500}
          height={500}
          className="w-full h-60 object-contain bg-gray-100 group-hover:scale-105 transition-transform duration-500"
        />

        <span className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-pink-500 dark:text-pink-400 text-xs font-bold px-3 py-1 rounded-full border border-pink-50 dark:border-zinc-800 flex items-center gap-1 shadow-sm">
          <PawPrint size={13} />
          {pet.species || "Animal"}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">
            {pet.petName || "Unknown Pet"}
          </h3>
          <span className="text-sm font-extrabold text-rose-500 dark:text-rose-400">
            {Number(pet.adoptionFee) === 0
              ? "Free"
              : `${pet.adoptionFee} BDT`}
          </span>
        </div>

        <p className="text-sm text-slate-500 dark:text-zinc-400 line-clamp-2 mb-5 flex-grow">
          {pet.description || "No description available."}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-zinc-400 mb-6 bg-slate-50 dark:bg-zinc-950 p-3 rounded-2xl border border-slate-100 dark:border-zinc-900">
          <div>
            <span className="font-semibold text-slate-700 dark:text-zinc-300">
              Breed:
            </span>{" "}
            {pet.breed || "N/A"}
          </div>
          <div>
            <span className="font-semibold text-slate-700 dark:text-zinc-300">
              Age:
            </span>{" "}
            {pet.age || "N/A"}
          </div>
          <div>
            <span className="font-semibold text-slate-700 dark:text-zinc-300">
              Gender:
            </span>{" "}
            {pet.gender || "Unknown"}
          </div>
          <div>
            <span className="font-semibold text-slate-700 dark:text-zinc-300">
              Location:
            </span>{" "}
            {pet.location || "Unknown"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <Link
            href={`/all-pets/${pet._id}`}
            className="w-full py-3 block text-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold text-sm transition-colors active:scale-[0.98]"
          >
            View Details
          </Link>
          <Link
            href={`/all-pets/${pet._id}`}
            className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-sm transition-all hover:opacity-95 active:scale-[0.98] flex items-center justify-center gap-1.5"
          >
            <Heart size={15} fill="currentColor" />
            Adopt Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}