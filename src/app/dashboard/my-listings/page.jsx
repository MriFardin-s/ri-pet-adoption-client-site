"use client";

import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";
import UpdatePetModal from "@/components/UpdatePetModal";
import PetRequestsModal from "@/components/PetRequestsModal";
import { authClient } from "@/lib/auth-client";

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

                const res = await fetch(`http://localhost:9000/pets/my-listings?email=${encodeURIComponent(currentUserEmail)}`, {
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

    const handleDelete = async (pet) => {
        try {
            const tokenResponse = await authClient.token();
            const token = tokenResponse?.data?.token || tokenResponse?.token;

            const res = await fetch(`http://localhost:9000/pets/${pet._id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`, 
                },
            });

            if (res.ok) {
                setPets((prevPets) => prevPets.filter((p) => p._id !== pet._id));
            } else {
                alert("Failed to delete the pet.");
            }
        } catch (error) {
            console.error("Error deleting pet:", error);
        }
    };

    return (
        <div className="p-6 w-full">
            <h1 className="text-2xl font-bold mb-6 text-slate-800">Welcome back, {session?.user?.name || "User"}!</h1>
            
            {pets.length === 0 ? (
                <p className="text-slate-400 text-sm">No pet listings found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pets.map((pet) => (
                        <PetCard 
                            key={pet._id} 
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
                        setPets(prev => prev.map(p => p._id === petId ? { ...p, status: newStatus } : p));
                    }}
                />
            )}
        </div>
    );
}