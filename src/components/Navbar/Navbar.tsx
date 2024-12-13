// import Image from "next/image";
import React from "react";
import { Wallet } from "../Wallet";

const Navbar = () => {
  return (
    <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {/* <Image src="/logo.svg" alt="Logo" width={40} height={40} /> */}
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
          Alpha
        </span>
      </div>

      <Wallet>Connect Wallet</Wallet>
    </nav>
  );
};

export default Navbar;
