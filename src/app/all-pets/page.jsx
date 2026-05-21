"use client";

import React, { useState, useEffect } from "react";
import PetCard from '@/components/PetCard';

export default function AllPetsPage() {
    const [search, setSearch] = useState("");
    const [species, setSpecies] = useState([]);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (species.length > 0) params.append("species", species.join(","));

        fetch(`http://localhost:9000/pets?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                setPets(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [search, species]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                <div className="text-center max-w-xl mx-auto mb-12">
                    <h1 className="text-3xl font-extrabold text-slate-800 dark:text-zinc-100">Meet Your Future Best Friend</h1>
                    <p className="mt-3 text-sm text-slate-500 dark:text-zinc-400">Browse through our beautiful list of loving pets.</p>
                </div>
                <div className="mb-8 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 flex flex-col md:flex-row gap-4">
                    <input 
                        type="text" 
                        placeholder="Search by name..." 
                        className="flex-1 px-4 py-2 border rounded-xl dark:bg-zinc-800"
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                    
                    <div className="flex gap-4 items-center">
                        <label className="flex items-center gap-2"><input type="checkbox" onChange={() => setSpecies(prev => prev.includes("Dog") ? prev.filter(s => s !== "Dog") : [...prev, "Dog"])} /> Dog</label>
                        <label className="flex items-center gap-2"><input type="checkbox" onChange={() => setSpecies(prev => prev.includes("Cat") ? prev.filter(s => s !== "Cat") : [...prev, "Cat"])} /> Cat</label>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-slate-500">Loading pets...</div>
                ) : pets.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pets.map((pet) => (
                            <PetCard key={pet._id} pet={pet} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-500 dark:text-zinc-400 font-medium">No pets found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}