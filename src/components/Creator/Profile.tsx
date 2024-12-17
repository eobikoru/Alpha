import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant/constant";
import { useAccount, useReadContract } from "wagmi";
import Loader from "../Loader";

interface ProfileProps {
  handleEditClick: () => void;
}

const Profile: React.FC<ProfileProps> = ({ handleEditClick }) => {
  const { address } = useAccount();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading }: any = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCreatorProfile",
    args: [address],
  });

  return (
    <>
      {isLoading ? (
        <>
          <Loader loading={true} />
          <Card className="max-w-lg mx-auto mt-10 h-[23rem] flex justify-center items-center mb-32">
            <div className="p-6">
            </div>
          </Card>
        </>
      ) : (
        <Card className="max-w-lg mx-auto mt-10 mb-32">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${data?.photoHash}`}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <Label>Name</Label>
                  <p className="text-gray-700">{data?.name}</p>
                </div>
              </div>
              <div>
                <Label>Bio</Label>
                <p className="text-gray-700">{data?.bio}</p>
              </div>
              <div>
                <Label>Twitter</Label>
                <p className="text-gray-700">{data?.twitterHandle}</p>
              </div>
              <div>
                <Label>GitHub</Label>
                <p className="text-gray-700">{data?.githubHandle}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-end">
              <Button type="button" onClick={handleEditClick}>
                Edit Profile
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Profile;
