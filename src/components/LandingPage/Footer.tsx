import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { socials } from "./socials";

const Footer = () => {
  return (
    <footer className="bg-opacity-5 bg-purple-500 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            {/* <Image src="/logo.svg" alt="Logo" width={40} height={40} /> */}
            <p className="mt-2 text-blue-200">
              Empowering Web3 creators since 2023
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-yellow-300">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-blue-200 hover:text-yellow-300 transition-colors"
                >
                  Privacy{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-blue-200 hover:text-yellow-300 transition-colors"
                >
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4 text-yellow-300">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              {socials.map((social, i) => (
                <Link
                  key={i}
                  href={social.link}
                  className="text-blue-200 hover:text-yellow-300 transition-colors"
                >
                  <span className="sr-only">{i}</span>
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
