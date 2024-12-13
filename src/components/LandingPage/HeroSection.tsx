"use client";
import React from "react";
import { motion } from "framer-motion";
import { Wallet } from "../Wallet";
// import Navbar from "../Navbar/Navbar";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
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
        <Wallet>Sign Up as Creator</Wallet>

        <button className="border-2 rounded-lg px-5 border-yellow-400 bg-white text-yellow-400 hover:bg-yellow-400 hover:text-purple-900">
          Explore Creators
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
