import Image from "next/image";
import { FaPaw, FaUser, FaMapMarkerAlt, FaClock, FaArrowLeft } from "react-icons/fa";
import AdoptForm from "@/components/AdoptForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UpdatePetModalWrapper from "@/components/UpdatePetModalWrapper";
import Link from "next/link";


export default async function PetDetailsPage({ params }) {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const session = await auth.api.getSession({
    headers: await import("next/headers").then((h) => h.headers()),
  });

  let pet = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      pet = await res.json();
    }
  } catch (error) {
    console.error("Error fetching pet details:", error);
  }

  const petOwnerEmail = pet?.addedBy?.email || pet?.addedBy || pet?.userEmail || pet?.ownerEmail;
  const isOwner = session?.user?.email && petOwnerEmail && session.user.email === petOwnerEmail;

  if (!pet) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2 bg-slate-50 dark:bg-zinc-950">
        <p className="text-slate-500 font-bold text-xl">
          Pet details not found!
        </p>
        <p className="text-xs text-red-400">
          Please check backend server or pet ID.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6 items-stretch">

        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm border border-pink-100 dark:border-pink-950/30 flex-1 flex flex-col">
            <div className="relative h-[300px] w-full bg-slate-200 dark:bg-zinc-800 rounded-3xl overflow-hidden">
              <Image
                loading="eager"
                src={
                  pet.imageUrl ||
                  pet.image ||
                  "https://placehold.co/1200x600?text=Pet+Image"
                }
                height={500}
                width={500}
                alt={pet.petName || pet.name || "Pet"}
                className="w-full h-full object-contain bg-slate-100 dark:bg-zinc-800"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <span className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md z-10">
                {pet.species || "Animal"}
              </span>
            </div>

            {isOwner && (
              <div className="px-8 pt-6">
                <UpdatePetModalWrapper pet={pet} />
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-6 flex-1">

              <Link
                href="/all-pets"
                className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold text-sm hover:underline mb-4"
              >
                <FaArrowLeft size={14} /> Back to All Pets
              </Link>

              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-zinc-800 pb-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                    {pet.petName || pet.name}
                    <FaPaw className="text-pink-500 text-2xl" />
                  </h1>


                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${pet.status === "adopted"
                      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border-emerald-100 dark:border-emerald-900/50"
                      : "bg-pink-50 dark:bg-pink-950/30 text-pink-600 border-pink-100 dark:border-pink-900/50"
                      }`}>
                      {pet.status === "adopted" ? "Adopted" : "Available"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-pink-400" />
                    {pet.location || "Not Specified"}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-pink-400" />
                    {pet.location || "Not Specified"}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/30 px-3 py-1 rounded-md uppercase">
                    {pet.breed || "Mixed"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 flex items-center gap-3">
                  <FaClock className="text-pink-500 text-xl" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold">Age</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-zinc-200">
                      {pet.age || "N/A"} Months
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 flex items-center gap-3">
                  <FaUser className="text-pink-500 text-xl" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold">Gender</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-zinc-200">
                      {pet.gender || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-200 mb-3">
                  About {pet.petName || pet.name}
                </h3>
                <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
                  {pet.description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col h-full">
          {isOwner ? (
            <div className="bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900/50 p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm h-full">
              <FaPaw className="text-5xl text-pink-500 mb-6" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 mb-2">This is your listing</h3>
              <p className="text-slate-600 dark:text-zinc-400">You are the owner of this pet.</p>
            </div>
          ) : (
            <>

              {pet.status === "adopted" ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-8 rounded-3xl text-center shadow-sm h-full flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-100 mb-2">
                    {pet.adoptedBy === session?.user?.email ? "Adopted by you!" : "Some one adopted this pet"}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    {pet.adoptedBy === session?.user?.email ? "Congratulations on your new companion." : "This pet has already found a home."}
                  </p>
                </div>
              ) : pet.status === "rejected" ? (

                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-8 rounded-3xl text-center shadow-sm h-full flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold text-red-600 mb-2">Request Rejected</h3>
                  <p className="text-red-500">Sorry, your request to adopt this pet was not accepted.</p>
                </div>
              ) : (

                <AdoptForm
                  key={pet.status}
                  petName={pet?.petName || pet?.name || ""}
                  petId={pet?._id || id}
                  petStatus={pet?.status || "available"}
                  ownerEmail={petOwnerEmail}
                  isOwner={isOwner}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}