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
      className="text-xl rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
    >
      <motion.div
        initial={{ scale: 0.6, rotate: 90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.2 }}
        key={resolvedTheme}
      >
        {isDark ? (
          <FiSun className="text-yellow-500" />
        ) : (
          <FiMoon className="text-pink-900" /> 
        )}
      </motion.div>
    </Button>
  );
}