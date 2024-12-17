'use client'
import React from 'react';
import { Card } from '../ui/card';
import { useRouter } from "next/navigation";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant/constant";
import { useAccount, useReadContract } from "wagmi";
const ButtonPrompt = () => {
    const router = useRouter();
    const {address} = useAccount();
  const { data } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCreatorProfile",
    args: [address],
  });

    const handleCreatorsPage = () => {
        router.push(`/creators-registration`);
    }
    const handleDashBoardPage = () => {
        router.push(`/creator`);
    }
    const checker = data?.isRegistered;
  return (
    <div className="flex items-center justify-center h-[37rem] ">
      <Card className="p-8 max-w-md text-center shadow-lg rounded-lg ">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to the Creator Dashboard
        </h2>
        <p className="text-gray-600 mb-6">
          Manage your content and explore the dashboard. Get started by creating a creator profile or heading to the dashboard.
        </p>
        <div className="flex gap-4 justify-center">
          <button
             checker
            className={`px-6 py-2 bg-indigo-600 text-white text-lg rounded hover:bg-indigo-700 transition duration-200 ${checker ? "cursor-not-allowed opacity-50" : ""}` 
            }
            onClick={handleCreatorsPage}
            disabled={checker}
          >
               Sign Up as Creator
          </button>
          <button
            className={`px-6 py-2 bg-teal-500 text-white text-lg rounded hover:bg-teal-600 transition duration-200 ${checker ? "": "cursor-not-allowed opacity-50" } `}
            onClick={handleDashBoardPage}
            disabled={!checker}
          >
            Dashboard
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ButtonPrompt;
