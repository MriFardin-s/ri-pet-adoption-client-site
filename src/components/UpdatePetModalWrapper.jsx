"use client";

import React, { useState } from "react";
import UpdatePetModal from "./UpdatePetModal"; 
import { HiOutlinePencil } from "react-icons/hi";

export default function UpdatePetModalWrapper({ pet }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-[0.98] transition-colors"
        
      >
        <HiOutlinePencil className="text-sm" /> 
        <span>Edit</span>
      </button>

      <UpdatePetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        pet={pet} 
      />
    </>
  );
}