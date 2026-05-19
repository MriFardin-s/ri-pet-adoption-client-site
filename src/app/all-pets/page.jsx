import React from 'react';
import PetCard from '@/components/PetCard';

const AllPetsPage = async () => {
  
  const res = await fetch("http://localhost:9000/pets", { cache: 'no-store' });
  const pets = await res.json();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-zinc-100">
            Meet Your Future Best Friend
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-zinc-400">
            Browse through our beautiful list of loving pets waiting for a sweet home.
          </p>
        </div>

        {/* Pet Cards Grid Container */}
        {pets && pets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-zinc-400 font-medium">No pets found for adoption right now.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllPetsPage;