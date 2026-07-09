"use client";

import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";
import UpdatePetModal from "@/components/UpdatePetModal";
import PetRequestsModal from "@/components/PetRequestsModal";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { toast } from "react-hot-toast";

export default function MyListings() {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [requestPet, setRequestPet] = useState(null);
    const { data: session } = authClient.useSession();
    const currentUserEmail = session?.user?.email;

    useEffect(() => {
        if (!currentUserEmail) return;

        const fetchMyListings = async () => {
            try {
                const tokenResponse = await authClient.token();
                const token = tokenResponse?.data?.token || tokenResponse?.token;

                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/my-listings?email=${encodeURIComponent(currentUserEmail)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token ? `Bearer ${token}` : ""
                    }
                });

                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setPets(data);
            } catch (err) {
                console.error("Error fetching listings:", err);
            }
        };

        fetchMyListings();
    }, [currentUserEmail]);


    // const refreshPets = async () => {
    //     if (!currentUserEmail) return;
    //     try {
    //         const tokenResponse = await authClient.token();
    //         const token = tokenResponse?.data?.token || tokenResponse?.token;
    //         const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/my-listings?email=${encodeURIComponent(currentUserEmail)}`, {
    //             headers: {
    //                 "Authorization": token ? `Bearer ${token}` : "",
    //                 "Cache-Control": "no-cache"
    //             }
    //         });
    //         const data = await res.json();
    //         setPets(data);
    //     } catch (err) {
    //         console.error("Error refreshing listings:", err);
    //     }
    // };

    const handleDelete = async (pet) => {

        const loadingToast = toast.loading("Deleting pet...");

        try {
            const tokenResponse = await authClient.token();
            const token = tokenResponse?.data?.token || tokenResponse?.token;

            if (!token) {
                toast.dismiss(loadingToast);
                toast.error("Session expired. Please login again.");
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${pet._id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            toast.dismiss(loadingToast);

            if (res.ok) {
                setPets((prevPets) => prevPets.filter((p) => p._id !== pet._id));
                toast.success("Pet deleted successfully!");
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "Failed to delete the pet.");
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            console.error("Error deleting pet:", error);
            toast.error("An unexpected error occurred.");
        }
    };

    const totalListings = pets.length;
    const adoptedPets = pets.filter(p => p.status === 'adopted').length;
    const availablePets = totalListings - adoptedPets;

    return (
        <div className="p-8 w-full min-h-screen bg-pink-50 dark:bg-[#120b0d] transition-colors duration-300">

            <div className="bg-base-300/40 dark:bg-pink-950/20 p-6 rounded-2xl border border-pink-200 dark:border-pink-900/30 mb-8 shadow-sm">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">My Listings</h1>
                <p className="text-slate-600 dark:text-pink-200/60 mt-1">Manage your pet listings and adoption requests.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-base-300/40 dark:bg-pink-950/20 p-5 rounded-2xl border border-pink-200 dark:border-pink-900/30 transition-all shadow-sm flex flex-col justify-center items-center">
                    <h3 className="text-sm font-bold text-pink-700 uppercase tracking-widest dark:text-pink-400">TOTAL LISTINGS</h3>
                    <p className="text-4xl font-extrabold mt-4 text-[#510424] dark:text-pink-100">{totalListings}</p>
                </div>
                <div className="bg-base-300/40 dark:bg-pink-950/20 p-5 rounded-2xl border border-pink-200 dark:border-pink-900/30 transition-all shadow-sm flex flex-col justify-center items-center">
                    <h3 className="text-sm font-bold text-pink-700 uppercase tracking-widest dark:text-pink-400">AVAILABLE</h3>
                    <p className="text-4xl font-extrabold mt-4 text-[#510424] dark:text-pink-100">{availablePets}</p>
                </div>
                <div className="bg-base-300/40 dark:bg-pink-950/20 p-5 rounded-2xl border border-pink-200 dark:border-pink-900/30 transition-all shadow-sm flex flex-col justify-center items-center">
                    <h3 className="text-sm font-bold text-pink-700 uppercase tracking-widest dark:text-pink-400">ADOPTED</h3>
                    <p className="text-4xl font-extrabold mt-4 text-[#510424] dark:text-pink-100">{adoptedPets}</p>
                </div>
            </div>

            {pets.length === 0 ? (
                <div className="bg-base-300/40 dark:bg-pink-950/20 p-12 rounded-2xl border border-pink-200 dark:border-pink-900/30 transition-all shadow-sm flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-white">No pets found</h3>

                    <Link
                        href="/dashboard/add-pet"
                        className="mt-4 px-4 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-sm transition-all hover:opacity-95 active:scale-[0.98] flex items-center justify-center gap-1.5"
                    >
                        <HiOutlinePlusCircle className="text-xl" /> Add New Pet
                    </Link>


                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pets.map((pet) => (
                        <PetCard
                            key={`${pet._id}-${pet.status}`}
                            pet={pet}
                            onEditClick={(p) => setSelectedPet(p)}
                            onRequestClick={(p) => setRequestPet(p)}
                            onDeleteClick={handleDelete}
                        />
                    ))}
                </div>
            )}

            {selectedPet && (
                <UpdatePetModal
                    isOpen={true}
                    onClose={() => setSelectedPet(null)}
                    pet={selectedPet}
                    onUpdateSuccess={(updatedPet) => {
                        setPets(prev => prev.map(p => p._id === updatedPet._id ? updatedPet : p));
                    }}
                />
            )}


            {requestPet && (
                <PetRequestsModal
                    isOpen={true}
                    onClose={() => setRequestPet(null)}
                    pet={requestPet}
                    onStatusUpdated={(petId, newStatus) => {
                        setPets(prevPets => prevPets.map(p =>
                            p._id === petId ? { ...p, status: newStatus } : p
                        ));
                    }}
                />
            )}
        </div>
    );
}