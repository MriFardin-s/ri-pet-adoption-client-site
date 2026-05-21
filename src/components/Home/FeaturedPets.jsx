import FeaturedPetsClient from "../FeaturedPetsClient";




async function getFeaturedPets() {
  const res = await fetch("http://localhost:9000/pets", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function FeaturedPets() {
  const pets = await getFeaturedPets();
  return <FeaturedPetsClient pets={pets.slice(0, 6)} />;
}