"use client";
// import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { TestimonialsUtil } from "./TestimonialsUtil";

const Testimonials = () => {
  return (
    <div>
      <section id="testimonials" className="py-20 bg-opacity-30 bg-indigo-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
            What Web3 Creators Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {TestimonialsUtil.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-800 to-purple-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="mb-4 text-blue-100 italic">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="rounded-full mr-4 w-[44px] h-[44px]"
                  />
                  <div>
                    <p className="font-semibold text-yellow-300">
                      {testimonial.name}
                    </p>
                    <p className="text-blue-200">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
