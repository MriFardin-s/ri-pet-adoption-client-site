"use client";

import React from "react";
import Link from "next/link";
import { HiEye } from "react-icons/hi"; 
import Image from "next/image";

const featuredPets = [
  { id: 1, name: "Buddy", breed: "Golden Retriever", age: "2 months", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=500" },
  { id: 2, name: "Luna", breed: "Siamese Cat", age: "3 months", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=500" },
  { id: 3, name: "Max", breed: "German Shepherd", age: "5 months", image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=500" },
  { id: 4, name: "Bella", breed: "Persian Cat", age: "4 months", image: "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?q=80&w=500" },
  { id: 5, name: "Charlie", breed: "Beagle", age: "2 months", image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=500" },
  { id: 6, name: "Milo", breed: "Calico Cat", age: "6 months", image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=500" },
];

export default function FeaturedPets() {
  return (
    <section id="featured-pets" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-pink-950 dark:text-pink-100">Featured Pets Waiting for You</h2>
        <p className="text-neutral-500 dark:text-pink-100/60 mt-2 font-medium">Meet our beautiful little friends who are perfectly ready to join your family.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredPets.map((pet) => (
          <div key={pet.id} className="bg-base-200 rounded-3xl border border-pink-200/60 dark:border-pink-950 shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-md hover:border-pink-300 dark:hover:border-pink-900">
            <div className="h-64 overflow-hidden relative">
              <Image 
                src={pet.image} 
                alt={pet.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                width={500}
                height={500}
              />
              <span className="absolute top-4 right-4 bg-base-100/90 dark:bg-base-200/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-pink-600 dark:text-pink-400 border border-pink-100 dark:border-pink-950">
                {pet.age}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-pink-950 dark:text-pink-100 flex items-center gap-2">
                <HiEye className="text-pink-500" /> {pet.name}
              </h3>
              <p className="text-sm font-semibold text-neutral-500 dark:text-pink-100/50 mt-1">{pet.breed}</p>
              <div className="mt-5">
                <Link href={`/pets/${pet.id}`} className="btn btn-outline border-pink-200 dark:border-pink-900 hover:bg-pink-600 hover:border-pink-600 text-pink-700 dark:text-pink-300 hover:text-white w-full rounded-xl font-bold transition-all">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}