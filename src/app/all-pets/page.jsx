"use client";

import React, { useState, useEffect } from "react";
import PetCard from '@/components/PetCard';
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

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

        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets?${params.toString()}`)
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

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 16 } }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-xl mx-auto mb-12"
                >
                    <h1 className="text-3xl font-extrabold text-slate-800 dark:text-zinc-100">Meet Your Future Best Friend</h1>
                    <p className="mt-3 text-sm text-slate-500 dark:text-zinc-400">Browse through our beautiful list of loving pets.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800/60 flex flex-col md:flex-row gap-6 items-center"
                >
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="w-full pl-12 pr-4 py-3 border border-pink-100 dark:border-zinc-700 rounded-xl focus:border-pink-500 focus:outline-none bg-transparent text-slate-800 dark:text-zinc-100 shadow-sm transition-all"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full md:w-48">
                        <select
                            className="w-full px-4 py-3 border border-pink-100 dark:border-zinc-700 rounded-xl focus:border-pink-500 focus:outline-none bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 shadow-sm transition-all appearance-none"
                            onChange={(e) => {
                                const value = e.target.value;
                                setSpecies(value ? [value] : []);
                            }}
                        >
                            <option value="">All Species</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Bird">Bird</option>
                            <option value="Rabbit">Rabbit</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center items-center min-h-[300px]"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full"
                            />
                        </motion.div>
                    ) : pets.length > 0 ? (
                        <motion.div
                            key="grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {pets.map((pet) => (
                                <motion.div key={pet._id} variants={itemVariants}>
                                    <PetCard pet={pet} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-16 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/50 rounded-2xl shadow-sm"
                        >

                            <p className="text-slate-500 dark:text-zinc-400 font-medium">No pets found matching your criteria.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}