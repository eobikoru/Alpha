import React from "react";
import { Button } from "@/components/ui/button";

const Cta = () => {
  return (
    <div>
      <section className="py-20 bg-opacity-30 bg-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
            Ready to Monetize Your Web3 Expertise?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join our decentralized platform today and start sharing your
            knowledge with the world.
          </p>
          <Button
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Cta;
