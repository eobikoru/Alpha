"use client";
import React from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { message } from "antd";

const HeroSection = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const handleCreate = () => {
    router.push(`/button-prompt`);
  };

  const handleComingSoon = () => {
    messageApi.open({
      type: "success",
      content: "Coming soon .......",
    });
  };

  return (
    <section className="container mx-auto px-4 py-20 text-center">
      {contextHolder}
      <motion.h1
        className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Monetize Your Web3 Expertise
      </motion.h1>
      <motion.p
        className="text-xl mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Empower creators and KOLs to share knowledge, offer curated toolkits,
        and book consultations in the decentralized world.
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <button
          onClick={handleCreate}
          disabled={!isConnected}
          className={`${
            !isConnected
              ? "cursor-not-allowed opacity-50"
              : "hover:from-pink-600 hover:to-yellow-600"
          } bg-gradient-to-r from-pink-500 to-yellow-500 text-white md:px-4 md:py-2 rounded-md font-semibold md:mr-12`}
        >
      Get started
        </button>

        <button
          onClick={handleComingSoon}
          className="border-2 rounded-lg px-5 border-yellow-400 bg-white text-yellow-400 hover:bg-yellow-400 hover:text-purple-900"
        >
          Explore Creators
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
