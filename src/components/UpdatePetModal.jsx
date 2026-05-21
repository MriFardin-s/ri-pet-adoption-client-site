"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BiEnvelope, BiTrash } from "react-icons/bi";
import { authClient } from "@/lib/auth-client";
import PetDeleteAlert from "./PetDeleteAlert";

export default function UpdatePetModal({ isOpen, onClose, pet, onUpdateSuccess, onDeleteSuccess }) {
    const { data: session } = authClient.useSession();
    const currentUserEmail = session?.user?.email;

    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen || !pet) return null;

    const petOwnerEmail = pet.userEmail || pet.ownerEmail;
    const isOwner = currentUserEmail && petOwnerEmail && currentUserEmail.toLowerCase() === petOwnerEmail.toLowerCase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isOwner) {
            toast.error("You are not authorized to update this pet");
            return;
        }

        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`http://localhost:9000/pets/${pet._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            
            if (!res.ok) throw new Error();
            
            toast.success("Pet updated successfully");
            
            if (onUpdateSuccess) {
                const clientSideUpdatedPet = {
                    ...pet,
                    ...updatedData,
                    adoptionFee: Number(updatedData.adoptionFee) || 0,
                    age: Number(updatedData.age) || 0
                };
                onUpdateSuccess(clientSideUpdatedPet);
            }
            
            onClose();
        } catch (error) {
            toast.error("Failed to update pet");
        }
    };

    const handleConfirmDelete = async () => {
        setIsDeleteAlertOpen(false); 
        setIsDeleting(true);
        
        try {
            const res = await fetch(`http://localhost:9000/pets/${pet._id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error();

            toast.success("Pet deleted successfully");
            if (onDeleteSuccess) {
                onDeleteSuccess(pet._id);
            }
            onClose(); 
        } catch (error) {
            toast.error("Failed to delete pet");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
            <div className="relative bg-white dark:bg-zinc-900 w-full max-w-[480px] rounded-2xl shadow-2xl border border-slate-100 dark:border-zinc-800 flex flex-col max-h-[90vh] overflow-hidden">
                <div className="flex flex-col pt-6 px-6 pb-4 border-b border-slate-50 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-pink-50 dark:bg-zinc-800 text-pink-500 rounded-xl"><BiEnvelope className="size-5" /></div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100">Update Pet Details</h2>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 text-xl font-semibold p-1 cursor-pointer">&times;</button>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-400">Modify the information for {pet?.petName || "your pet"}.</p>
                </div>
                
                <div className="px-6 py-4 overflow-y-auto flex-1">
                    {!isOwner && (
                        <div className="mb-4 p-3 bg-amber-50 text-amber-700 text-xs font-medium rounded-xl border border-amber-100">
                            Warning: Only the pet owner can update or delete this listing.
                        </div>
                    )}

                    <form id="update-pet-form" onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col w-full">
                            <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Pet Name <span className="text-rose-500">*</span></label>
                            <input disabled={!isOwner} type="text" name="petName" required defaultValue={pet?.petName || ""} className="w-full px-4 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 disabled:opacity-60" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Species *</label>
                                <select disabled={!isOwner} name="species" required className="w-full px-3 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 disabled:opacity-60" defaultValue={pet?.species || ""}>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                    <option value="Bird">Bird</option>
                                    <option value="Rabbit">Rabbit</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Breed *</label>
                                <input disabled={!isOwner} type="text" name="breed" required defaultValue={pet?.breed || ""} className="w-full px-4 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 disabled:opacity-60" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Age *</label>
                                <input disabled={!isOwner} type="number" name="age" required defaultValue={pet?.age || ""} className="w-full px-4 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 disabled:opacity-60" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Gender *</label>
                                <select disabled={!isOwner} name="gender" required className="w-full px-3 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 disabled:opacity-60" defaultValue={pet?.gender || ""}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Health Status *</label>
                                <select disabled={!isOwner} name="healthStatus" required className="w-full px-3 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 disabled:opacity-60" defaultValue={pet?.healthStatus || ""}>
                                    <option value="Healthy">Healthy</option>
                                    <option value="Under Treatment">Under Treatment</option>
                                    <option value="Special Needs">Special Needs</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Vaccination *</label>
                                <select disabled={!isOwner} name="vaccinationStatus" required className="w-full px-3 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 disabled:opacity-60" defaultValue={pet?.vaccinationStatus || ""}>
                                    <option value="Fully Vaccinated">Fully Vaccinated</option>
                                    <option value="Partially Vaccinated">Partially Vaccinated</option>
                                    <option value="Not Vaccinated">Not Vaccinated</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Location *</label>
                                <input disabled={!isOwner} type="text" name="location" required defaultValue={pet?.location || ""} className="w-full px-4 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 disabled:opacity-60" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Adoption Fee *</label>
                                <input disabled={!isOwner} type="number" name="adoptionFee" required defaultValue={pet?.adoptionFee || 0} className="w-full px-4 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 disabled:opacity-60" />
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Image URL *</label>
                            <input disabled={!isOwner} type="url" name="imageUrl" required defaultValue={pet?.imageUrl || ""} className="w-full px-4 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 disabled:opacity-60" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Description *</label>
                            <textarea disabled={!isOwner} name="description" required defaultValue={pet?.description || ""} className="w-full px-4 py-2 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl min-h-[80px] focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 resize-y disabled:opacity-60"></textarea>
                        </div>
                    </form>
                </div>
                
                <div className="px-6 pb-6 pt-4 flex items-center border-t border-slate-50 dark:border-zinc-800">
                    {isOwner && (
                        <button 
                            type="button" 
                            disabled={isDeleting}
                            onClick={() => setIsDeleteAlertOpen(true)} 
                            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <BiTrash className="size-4" />
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    )}

                    <div className="flex gap-3 ml-auto">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer">Cancel</button>
                        <button type="submit" form="update-pet-form" disabled={!isOwner} className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-md rounded-xl px-6 py-2.5 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">Save Changes</button>
                    </div>
                </div>
            </div>

            <PetDeleteAlert
                isOpen={isDeleteAlertOpen}
                onClose={() => setIsDeleteAlertOpen(false)}
                onConfirm={handleConfirmDelete}
                petName={pet?.petName}
            />
        </div>
    );
}