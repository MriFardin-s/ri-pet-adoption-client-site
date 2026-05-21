"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaPaw } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import { BiCopyright } from "react-icons/bi";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-linear-to-b from-pink-50/50 to-pink-100/80 dark:from-base-200 dark:to-base-300 text-base-content border-t border-pink-200/40 transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Logo and Brand Section */}
          <div className="space-y-4">
            <Link href="/">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 font-bold text-xl w-max cursor-pointer select-none"
              >
                <div className="bg-white/80 dark:bg-pink-900/20 p-2 rounded-xl shadow-sm border border-pink-200/30 flex items-center justify-center">
                  <FaPaw className="text-pink-600 dark:text-pink-400 text-xl" />
                </div>
                <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent font-extrabold text-2xl tracking-tight">
                  PetAdopt
                </span>
              </motion.div>
            </Link>
            <p className="text-sm text-slate-700 dark:text-pink-100/70 max-w-sm leading-relaxed font-medium">
              We are dedicated to bringing vulnerable and homeless pets into loving, safe, and permanent homes. Adopt today and make a lifetime difference.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="font-bold text-pink-700 dark:text-pink-400 text-sm tracking-wide uppercase">
              Contact Information
            </h3>
            <ul className="space-y-3 text-sm text-slate-700 dark:text-pink-100 font-medium">
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-white dark:bg-base-100 rounded-lg shadow-sm text-pink-600 group-hover:text-pink-700 transition-colors">
                  <HiOutlineLocationMarker className="text-lg" />
                </div>
                <span>123 Pet Street, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-white dark:bg-base-100 rounded-lg shadow-sm text-pink-600 group-hover:text-pink-700 transition-colors">
                  <HiOutlinePhone className="text-lg" />
                </div>
                <a href="tel:+8801234567890" className="hover:underline hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  +880 1234 567890
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-white dark:bg-base-100 rounded-lg shadow-sm text-pink-600 group-hover:text-pink-700 transition-colors">
                  <HiOutlineMail className="text-lg" />
                </div>
                <a href="mailto:support@petadopt.com" className="hover:underline hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  support@petadopt.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="space-y-3">
            <h3 className="font-bold text-pink-700 dark:text-pink-400 text-sm tracking-wide uppercase">
              Social Links
            </h3>
            <p className="text-sm text-slate-700 dark:text-pink-100/70 font-medium">
              Join our community and get updates on the latest and cutest pets available for adoption:
            </p>
            <div className="flex space-x-3 pt-1">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="btn btn-circle bg-white hover:bg-pink-600 text-[#1877F2] hover:text-white border border-pink-100 dark:border-none shadow-sm text-lg flex items-center justify-center cursor-pointer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="btn btn-circle bg-white hover:bg-gradient-to-tr hover:from-yellow-500 hover:to-purple-600 text-[#E4405F] hover:text-white border border-pink-100 dark:border-none shadow-sm text-lg flex items-center justify-center cursor-pointer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="btn btn-circle bg-white hover:bg-sky-500 text-[#1DA1F2] hover:text-white border border-pink-100 dark:border-none shadow-sm text-lg flex items-center justify-center cursor-pointer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Copyright Footer Bar */}
        <div className="w-full mt-12 pt-6 border-t border-pink-200/50 dark:border-pink-900/30">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center text-sm font-semibold text-slate-500 dark:text-pink-400/50 select-none">
            <span className="flex items-center gap-1">
              <BiCopyright className="text-base" />
              <span>{currentYear || "2026"}</span>
            </span>
            <span className="text-pink-600 dark:text-pink-400">PetAdopt</span>
            <span>Platform. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}