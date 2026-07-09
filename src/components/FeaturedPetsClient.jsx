"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function FeaturedPetsClient({ pets }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 16 }
    }
  };

  const getStatusStyle = (status) => {
    const s = (status || "AVAILABLE").toUpperCase();
    const statusStyles = {
      "PENDING": "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-100 dark:border-amber-900",
      "ADOPTED": "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900",
      "AVAILABLE": "bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-400 dark:border-sky-900/50 border-sky-100"
    };
    return statusStyles[s] || statusStyles["AVAILABLE"];
  };

  return (
    <section id="featured-pets" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-pink-950 dark:text-pink-100">Featured Pets Waiting for You</h2>
        <p className="text-neutral-500 dark:text-pink-100/60 mt-2 font-medium">Meet our beautiful little friends who are perfectly ready to join your family.</p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {pets.map((pet) => (
          <motion.div
            key={pet._id}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="bg-base-200 rounded-3xl border border-pink-200/60 dark:border-pink-950 shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-md hover:border-pink-300 dark:hover:border-pink-900"
          >
            <div className="h-64 overflow-hidden relative">
              <Image
                src={pet.imageUrl || pet.image}
                alt={pet.petName || pet.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                width={500}
                height={500}
              />
              <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(pet.status)}`}>
                {pet.status || "AVAILABLE"}
              </span>
              
              <span className="absolute top-4 right-4 bg-base-100/90 dark:bg-base-200/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-pink-600 dark:text-pink-400 border border-pink-100 dark:border-pink-950">
                {pet.age} Months
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-pink-950 dark:text-pink-100 flex items-center gap-2">
                {pet.petName || pet.name}
              </h3>
              <p className="text-sm font-semibold text-neutral-500 dark:text-pink-100/50 mt-1">{pet.breed}</p>
              <div className="mt-5">
                <Link href={`/all-pets/${pet._id}`} className="block w-full">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-outline border-pink-200 dark:border-pink-900 hover:bg-pink-600 hover:border-pink-600 text-pink-700 dark:text-pink-300 hover:text-white w-full rounded-xl font-bold transition-all flex items-center justify-center cursor-pointer"
                  >
                    View Details
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}