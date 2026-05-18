"use client";

import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedPets from "@/components/home/FeaturedPets";
import StaticInfo from "@/components/home/StaticInfo";
import AdoptionEvents from "@/components/home/AdoptionEvents";
import Volunteer from "@/components/home/Volunteer";

export default function HomePage() {
  return (
    <div className="bg-base-100 text-base-content min-h-screen transition-colors duration-300">
      <HeroBanner />
      <FeaturedPets />
      <StaticInfo />
      <AdoptionEvents />
      <Volunteer />
    </div>
  );
}