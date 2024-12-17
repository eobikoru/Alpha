import React from "react";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const Cta = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  const handleCreate = () => {
    router.push(`/button-prompt`);
  };

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
   onClick={handleCreate}
   disabled={!isConnected}
   className={`${
     !isConnected
       ? "cursor-not-allowed opacity-50"
       : "hover:from-pink-600 hover:to-yellow-600"
   } bg-gradient-to-r from-pink-500 to-yellow-500 text-white md:px-4 md:py-2 rounded-md font-semibold md:mr-12`}

            variant="default"
            size="lg"
               >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Cta;
