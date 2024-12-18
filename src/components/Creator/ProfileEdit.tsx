'use client';

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ClipLoader } from "react-spinners";
import { useWriteContract, useAccount, useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant/constant";
import Profile from "./Profile";
import { message } from "antd";

// Define the structure of the contract data
interface CreatorProfile {
  name: string;
  bio: string;
  photoHash: string;
  twitterHandle: string;
  githubHandle: string;
}

const ProfileEdit = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { address } = useAccount();

  // Define the contract read call with typed response
  const { data } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCreatorProfile",
    args: [address],
  }) as { data: CreatorProfile };

  const [messageApi, contextHolder] = message.useMessage();
  const { writeContract, isPending, isError, isSuccess } = useWriteContract();

  // State for form data
  const [formData, setFormData] = useState<CreatorProfile>({
    name: "",
    bio: "",
    photoHash: "",
    twitterHandle: "",
    githubHandle: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Display success message
  useEffect(() => {
    if (successMessage) {
      messageApi.open({
        type: "success",
        content: successMessage,
      });
      setSuccessMessage(null);
    }
  }, [successMessage, messageApi]);

  // Display error message
  useEffect(() => {
    if (errorMessage) {
      messageApi.open({
        type: "error",
        content: errorMessage,
      });
      setErrorMessage(null);
    }
  }, [errorMessage, messageApi]);

  // Handle contract submission success and errors
  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => {
        setIsEditing(false);
      }, 1500);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setErrorMessage("This operation failed.");
    }
  }, [isError]);

  // Set form data from contract
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        bio: data.bio || "",
        photoHash: data.photoHash || "",
        twitterHandle: data.twitterHandle || "",
        githubHandle: data.githubHandle || "",
      });
    }
  }, [data]);

  // Handle file upload and set IPFS hash
  const handleSubmission = async (fileToUpload: File) => {
    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);

      const metadata = JSON.stringify({ name: fileToUpload.name });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({ cidVersion: 0 });
      formData.append("pinataOptions", options);

      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
        body: formData,
      });

      const resData = await res.json();
      const ipfsHash = resData.IpfsHash;

      setFormData((prev) => ({
        ...prev,
        photoHash: ipfsHash, // Save only the IPFS hash
      }));

      setSuccessMessage("File uploaded successfully!");
    } catch (error) {
      setErrorMessage("File upload failed.");
      console.error(error);
    }
  };

  // Handle input changes
  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const files = e.target.files;

      if (files && files[0]) {
        try {
          await handleSubmission(files[0]); // Upload file to IPFS
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          setErrorMessage("File upload failed.");
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.photoHash) {
      setErrorMessage("Please upload an image first.");
      return;
    }

    try {
      await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "editProfile",
        args: [
          formData.name,
          formData.bio,
          formData.photoHash,
          formData.twitterHandle,
          formData.githubHandle,
        ],
      });
    } catch (error) {
      setErrorMessage("An error occurred while saving your profile.");
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBackClick = () => {
    setIsEditing(false);
  };

  return isEditing ? (
    <Card>
      {contextHolder}
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
          </div>
          <div>
            <Label htmlFor="photoHash">Upload photo</Label>
            <Input
              type="file"
              id="photoHash"
              name="photoHash"
              accept="image/*"
              onChange={handleChange}
              placeholder="Select an image file"
            />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitterHandle"
              value={formData.twitterHandle}
              onChange={handleChange}
              placeholder="Your Twitter handle"
            />
          </div>
          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="githubHandle"
              value={formData.githubHandle}
              onChange={handleChange}
              placeholder="Your GitHub username"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="submit">
              {isPending ? (
                <span className="flex items-center">
                  <ClipLoader size={14} color="#fff" className="mr-2" /> Saving
                </span>
              ) : (
                "Save Profile"
              )}
            </Button>
            <Button type="button" variant="secondary" onClick={handleBackClick}>
              Back
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  ) : (
    <Profile handleEditClick={handleEditClick} />
  );
};

export default ProfileEdit;
