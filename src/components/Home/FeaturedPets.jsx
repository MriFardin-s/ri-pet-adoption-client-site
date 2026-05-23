import FeaturedPetsClient from "../FeaturedPetsClient";




async function getFeaturedPets() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets`, { cache: "no-store" });
  console.log(res);
  // if (!res.ok) return [];
  return res.json();
}

export default async function FeaturedPets() {
  const pets = await getFeaturedPets();
  return <FeaturedPetsClient pets={pets.slice(0, 6)} />;
}