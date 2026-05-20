import React from "react";
import Image from "next/image";

import {
  FaPaw,
  FaUser,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import AdoptForm from "@/components/AdoptForm";

export default async function PetDetailsPage({ params }) {

  const { id } = await params;

  let pet = null;

  try {
    const res = await fetch(`http://localhost:9000/pets/${id}`, {
      cache: "no-store",
    });

    if (res.ok) {
      pet = await res.json();
    }
  } catch (error) {
    console.error("Error fetching pet details:", error);
  }


  if (!pet) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2 bg-slate-50 dark:bg-zinc-950">
        <p className="text-slate-500 font-bold text-xl">
          Pet details not found!
        </p>
        <p className="text-xs text-red-400">
          Please check backend server or pet ID.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">

   
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6 items-stretch">


        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm border border-pink-100 dark:border-pink-950/30 flex-1 flex flex-col">

            {/* IMAGE */}
            <div className="relative h-[400px] w-full bg-slate-200 dark:bg-zinc-800">
              <Image
                width={1200}
                height={600}
                src={
                  pet.imageUrl ||
                  pet.image ||
                  "https://placehold.co/1200x600?text=Pet+Image"
                }
                alt={pet.petName || pet.name || "Pet"}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                {pet.species || "Animal"}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-6 sm:p-8 space-y-6 flex-1">

              {/* TOP */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-zinc-800 pb-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                    {pet.petName || pet.name}
                    <FaPaw className="text-pink-500 text-2xl" />
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-pink-400" />
                    {pet.location || "Not Specified"}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/30 px-3 py-1 rounded-md uppercase">
                    {pet.breed || "Mixed"}
                  </span>
                </div>
              </div>

    
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           
                <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 flex items-center gap-3">
                  <FaClock className="text-pink-500 text-xl" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold">
                      Age
                    </p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-zinc-200">
                      {pet.age || "N/A"} Months
                    </p>
                  </div>
                </div>

                {/* GENDER */}
                <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 flex items-center gap-3">
                  <FaUser className="text-pink-500 text-xl" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold">
                      Gender
                    </p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-zinc-200">
                      {pet.gender || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-200 mb-3">
                  About {pet.petName || pet.name}
                </h3>
                <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
                  {pet.description || "No description provided."}
                </p>
              </div>

            </div>
          </div>
        </div>

  
        <div className="lg:col-span-1 flex flex-col h-full">
         <AdoptForm 
          petName={pet?.name || pet?.petName || ""} 
          petId={pet?._id || id} 
          petStatus={pet?.status || "available"} 
        />
        </div>

      </div>
    </div>
  );
}