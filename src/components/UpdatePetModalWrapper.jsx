"use client";
import React, { useState } from "react";
import UpdatePetModal from "./UpdatePetModal"; 

export default function UpdatePetModalWrapper({ pet }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-xl font-bold"
      >
        Edit Pet Details
      </button>

      <UpdatePetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        pet={pet} 
      />
    </>
  );
}