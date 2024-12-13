"use client";
import React from "react";
import { motion } from "framer-motion";
import { FeaturesUtil } from "./FeaturesUtil";

const Features = () => {
  return (
    <div>
      <section className="py-20 bg-opacity-30 bg-blue-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {FeaturesUtil.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-purple-800 to-indigo-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-yellow-300">
                  {feature.title}
                </h3>
                <p className="text-blue-100">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
