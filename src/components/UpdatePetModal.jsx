"use client";

import React from "react";
import { toast } from "react-hot-toast";
import { BiEnvelope } from "react-icons/bi";
import { authClient } from "@/lib/auth-client";

export default function UpdatePetModal({ isOpen, onClose, pet, onUpdateSuccess }) {
    const { data: session } = authClient.useSession();
    const currentUserEmail = session?.user?.email;

    if (!isOpen || !pet) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 text-xl font-semibold p-1">&times;</button>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-400">Modify the information for {pet?.petName || "your pet"}.</p>
                </div>
                
                <div className="px-6 py-4 overflow-y-auto flex-1">
                    <form id="update-pet-form" onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col w-full">
                            <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Pet Name <span className="text-rose-500">*</span></label>
                            <input type="text" name="petName" required defaultValue={pet?.petName || ""} className="w-full px-4 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Species *</label>
                                <select name="species" required className="w-full px-3 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100" defaultValue={pet?.species || ""}>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                    <option value="Bird">Bird</option>
                                    <option value="Rabbit">Rabbit</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Breed *</label>
                                <input type="text" name="breed" required defaultValue={pet?.breed || ""} className="w-full px-4 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Age *</label>
                                <input type="number" name="age" required defaultValue={pet?.age || ""} className="w-full px-4 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Gender *</label>
                                <select name="gender" required className="w-full px-3 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100" defaultValue={pet?.gender || ""}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Health Status *</label>
                                <select name="healthStatus" required className="w-full px-3 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100" defaultValue={pet?.healthStatus || ""}>
                                    <option value="Healthy">Healthy</option>
                                    <option value="Under Treatment">Under Treatment</option>
                                    <option value="Special Needs">Special Needs</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Vaccination *</label>
                                <select name="vaccinationStatus" required className="w-full px-3 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100" defaultValue={pet?.vaccinationStatus || ""}>
                                    <option value="Fully Vaccinated">Fully Vaccinated</option>
                                    <option value="Partially Vaccinated">Partially Vaccinated</option>
                                    <option value="Not Vaccinated">Not Vaccinated</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Location *</label>
                                <input type="text" name="location" required defaultValue={pet?.location || ""} className="w-full px-4 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Adoption Fee *</label>
                                <input type="number" name="adoptionFee" required defaultValue={pet?.adoptionFee || 0} className="w-full px-4 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100" />
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Image URL *</label>
                            <input type="url" name="imageUrl" required defaultValue={pet?.imageUrl || ""} className="w-full px-4 py-2.5 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="mb-1.5 font-semibold text-xs text-slate-700 dark:text-zinc-200">Description *</label>
                            <textarea name="description" required defaultValue={pet?.description || ""} className="w-full px-4 py-2 text-sm border border-pink-100 dark:border-zinc-700 rounded-xl min-h-[80px] focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 resize-y"></textarea>
                        </div>
                    </form>
                </div>
                
                <div className="px-6 pb-6 pt-4 flex justify-end gap-3 border-t border-slate-50 dark:border-zinc-800">
                    <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all">Cancel</button>
                    <button type="submit" form="update-pet-form" disabled={!currentUserEmail} className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-md rounded-xl px-6 py-2.5 active:scale-95 transition-all">Save Changes</button>
                </div>
            </div>
        </div>
    );
}