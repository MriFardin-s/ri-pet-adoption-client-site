"use client"; 
import { useState } from "react";
import Image from "next/image";

export const UserAvatar = ({ session }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden relative border border-pink-200">
      {session?.user?.image && !imgError ? (
        <Image
          src={session.user.image}
          referrerPolicy="no-referrer"
          alt="User Avatar"
          width={40}
          height={40}
          className="object-cover w-full h-full"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full bg-pink-600 flex items-center justify-center text-white font-bold text-sm uppercase">
          {session?.user?.name ? session.user.name.slice(0, 2).toUpperCase() : "US"}
        </div>
      )}
    </div>
  );
};