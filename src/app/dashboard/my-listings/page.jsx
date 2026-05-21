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
    const { data: session, isPending } = authClient.useSession();
    const currentUserEmail = session?.user?.email;

    useEffect(() => {
        if (!currentUserEmail) return;

        fetch(`http://localhost:9000/pets/my-listings?email=${currentUserEmail}`)
            .then((res) => res.json())
            .then((data) => setPets(data))
            .catch((err) => console.error(err));
    }, [currentUserEmail]);

    const handleEditClick = (pet) => {
        setSelectedPet(pet);
    };

    const handleRequestClick = (pet) => {
        setRequestPet(pet);
    };

    const handleUpdatePet = (updatedPet) => {
        setPets((prevPets) =>
            prevPets.map((p) => (p._id === updatedPet._id ? updatedPet : p))
        );
    };

    const handleDeletePet = (deletedPetId) => {
        setPets((prevPets) => prevPets.filter((p) => p._id !== deletedPetId));
    };

    const handleStatusUpdated = (petId, newStatus) => {
        setPets((prevPets) =>
            prevPets.map((p) => (p._id === petId ? { ...p, status: newStatus } : p))
        );
    };

    if (isPending) {
        return <div className="p-6 text-slate-400 text-sm">Loading...</div>;
    }

    if (!session) {
        return <div className="p-6 text-rose-500 text-sm">Please log in to view your listings.</div>;
    }

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
                            onEditClick={handleEditClick} 
                            onRequestClick={handleRequestClick}
                        />
                    ))}
                </div>
            )}

            {selectedPet && (
                <UpdatePetModal
                    isOpen={true}
                    onClose={() => setSelectedPet(null)}
                    pet={selectedPet}
                    onUpdateSuccess={handleUpdatePet}
                    onDeleteSuccess={handleDeletePet}
                />
            )}

            {requestPet && (
                <PetRequestsModal
                    isOpen={true}
                    onClose={() => setRequestPet(null)}
                    pet={requestPet}
                    onStatusUpdated={handleStatusUpdated}
                />
            )}
        </div>
    );
}