"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import DeleteAlert from "@/components/DeleteAlert";
import { motion } from "framer-motion";

export default function MyRequestsPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchMyRequests = async () => {
    try {
      const tokenResponse = await authClient.token();
      const token = tokenResponse?.data?.token || tokenResponse?.token;

      const res = await fetch(
        `http://localhost:9000/adoptions/my-requests?email=${session.user.email}`, {
          method: "GET",
          headers: {
            ...(token && { "Authorization": `Bearer ${token}` })
          }
        }
      );
      if (!res.ok) throw new Error("Failed to fetch requests");
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
      toast.error("Could not load your adoption requests");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sessionLoading) return;
    if (!session?.user?.email) {
      setIsLoading(false);
      return;
    }
    fetchMyRequests();
  }, [session, sessionLoading]);

  const openDeleteModal = (request) => {
    setSelectedRequest(request);
    setIsOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedRequest(null);
    setIsOpen(false);
  };

  const handleCancelRequest = async () => {
    if (!selectedRequest) return;

    try {
      const tokenResponse = await authClient.token();
      const token = tokenResponse?.data?.token || tokenResponse?.token;

      const res = await fetch(`http://localhost:9000/adoptions/${selectedRequest._id}`, {
        method: "DELETE",
        headers: {
          ...(token && { "Authorization": `Bearer ${token}` })
        }
      });

      if (!res.ok) throw new Error("Failed to delete request");

      toast.success("Adoption request cancelled");
      setRequests(requests.filter((req) => req._id !== selectedRequest._id));
      closeDeleteModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel request");
    }
  };

  if (sessionLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
            className="text-sm font-medium text-slate-400"
          >
            Loading your requests...
          </motion.p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500 font-semibold">Please log in to view your requests.</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 max-w-6xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-black text-slate-800 dark:text-zinc-100">My Adoption Requests</h1>
        <p className="text-sm text-slate-400 mt-1">Track and manage the status of your pet adoption requests</p>
      </motion.div>

      {requests.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/50 rounded-2xl p-12 text-center shadow-sm"
        >
          <p className="text-slate-500 dark:text-zinc-400 font-medium">You have not requested to adopt any pets yet.</p>
        </motion.div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="overflow-x-auto bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/50 rounded-2xl shadow-sm"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-zinc-950 text-slate-500 dark:text-zinc-400 font-bold text-xs uppercase tracking-wider border-b border-slate-100 dark:border-zinc-800">
                <th className="px-6 py-4">Pet Name</th>
                <th className="px-6 py-4">Request Date</th>
                <th className="px-6 py-4">Pickup Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-sm text-slate-700 dark:text-zinc-300">
              {requests.map((request) => (
                <tr key={request._id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-zinc-100">
                    {request.petName}
                  </td>
                  <td className="px-6 py-4">
                    {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {request.pickupDate || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border
                        ${request.status === "approved" || request.status === "adopted"
                          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-950/50"
                          : request.status === "rejected"
                            ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-950/50"
                            : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-950/50"
                        }`}
                    >
                      {request.status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center gap-3">
                    <Link href={`/all-pets/${request.petId}`}>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 font-medium text-xs transition cursor-pointer"
                      >
                        <Eye size={14} /> View
                      </motion.span>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => openDeleteModal(request)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-medium text-xs transition"
                    >
                      <Trash2 size={14} /> Cancel
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {isOpen && (
        <DeleteAlert
          isOpen={isOpen}
          onClose={closeDeleteModal}
          onConfirm={handleCancelRequest}
          petName={selectedRequest?.petName || ""}
        />
      )}
    </motion.div>
  );
}