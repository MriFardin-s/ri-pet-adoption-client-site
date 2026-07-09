"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme(); 

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-10 h-10" />;

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      isIconOnly
      variant="light"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
   
      className="text-xl rounded-full hover:bg-pink-100/70 dark:hover:bg-pink-950/40 transition-colors"
    >
      <motion.div
        initial={{ scale: 0.6, rotate: -45 }} 
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        key={resolvedTheme}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <FiSun className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
        ) : (
          <FiMoon className="text-pink-600 dark:text-pink-400" /> 
        )}
      </motion.div>
    </Button>
  );
}