"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useWriteContract, useWaitForTransactionReceipt  } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/constant/constant";
import { ClipLoader } from "react-spinners";
import { message } from "antd";

// Type Definition for Form Data
interface FormData {
  name: string;
  bio: string;
  photoHash: string | null;
  twitterHandle: string;
  githubHandle: string;
}

const CreatorRegistration = () => {
  const router = useRouter();
  const { writeContract, data:hash, isPending, isError,  } = useWriteContract();
  const { isSuccess:isSuccessHash} = useWaitForTransactionReceipt({
    hash, 
  });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    bio: "",
    photoHash: null,
    twitterHandle: "",
    githubHandle: "",
  });

  const [messageApi, contextHolder] = message.useMessage();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Reusable Notification Functions
  const showSuccess = (content: string) =>
    messageApi.open({ type: "success", content });

  const showError = (content: string) =>
    messageApi.open({ type: "error", content });

  // Handle success or error messages
  useEffect(() => {
    if (isSuccessHash) {
      showSuccess("Operation successful!");
      resetForm();
      router.push("/creator");
    }

    if (isError) {
      showError("This operation failed");
    }
  }, [isSuccessHash, isError, messageApi, router]);

  // Disable Submit Button Logic
  useEffect(() => {
    const isFormIncomplete = Object.values(formData).some((value) => !value);
    setIsButtonDisabled(isFormIncomplete);
  }, [formData]);

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const files = e.target.files;
      setFormData((prev) => ({
        ...prev,
        [id]: files ? files[0] : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  // Handle File Upload
  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      await handleSubmission(selectedFile);
    }
  };

  const handleSubmission = async (fileToUpload: string | Blob) => {
    try {
      const data = new FormData();
      data.append("file", fileToUpload);
      data.append("pinataMetadata", JSON.stringify({ name: "File name" }));
      data.append("pinataOptions", JSON.stringify({ cidVersion: 0 }));

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
          body: data,
        }
      );

      const resData = await res.json();
      const ipfsHash = resData.IpfsHash;

      setFormData((prev) => ({ ...prev, photoHash: ipfsHash }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      showError("Trouble uploading file");
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.photoHash) {
      showError("Please upload an image first");
      return;
    }

    try {
      await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "registerCreator",
        args: [
          formData.name,
          formData.bio,
          formData.photoHash,
          formData.twitterHandle,
          formData.githubHandle,
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      bio: "",
      photoHash: null,
      twitterHandle: "",
      githubHandle: "",
    });
  };

  return (
    <>
      {contextHolder}
      <Card className="max-w-lg mx-auto mt-10 mb-32">
        <CardHeader>
          <CardTitle>Creator Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Write a short bio about yourself"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            {/* Photo Hash */}
            <div>
              <Label htmlFor="imageUpload">Upload photo</Label>
              <Input
                type="file"
                id="imageUpload"
                accept="image/png, image/jpg, image/jpeg, image/webp"
                onChange={changeHandler}
              />
            </div>

            {/* Twitter Handle */}
            <div>
              <Label htmlFor="twitterHandle">Twitter Handle</Label>
              <Input
                type="text"
                id="twitterHandle"
                placeholder="Enter your Twitter handle"
                value={formData.twitterHandle}
                onChange={handleChange}
              />
            </div>

            {/* GitHub Handle */}
            <div>
              <Label htmlFor="githubHandle">GitHub Handle</Label>
              <Input
                type="text"
                id="githubHandle"
                placeholder="Enter your GitHub handle"
                value={formData.githubHandle}
                onChange={handleChange}
              />
            </div>

            <CardFooter>
              <div className="w-full flex justify-end">
                <Button
                  type="submit"
                  variant="default"
                  size="default"
                  className={
                    isButtonDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                  disabled={isButtonDisabled}
                >
                  {isPending ? (
                    <span className="flex items-center">
                      <ClipLoader size={14} color="#fff" className="mr-2" />{" "}
                      Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreatorRegistration;
