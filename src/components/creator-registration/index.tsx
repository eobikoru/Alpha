"use client";

import React, { useState, useEffect } from "react";
import { CardContent, Card, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/constant/constant";

const CreatorRegistration = () => {
  const router = useRouter();
  const { writeContract, isPending } = useWriteContract();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    imageUpload: null,
    twitterHandle: "",
    githubHandle: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const isFormIncomplete = Object.values(formData).some((value) => !value);
    setIsButtonDisabled(isFormIncomplete);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!", formData);

    try {
      const result = await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "registerCreator",
        args: [formData.name, formData.bio, formData.twitterHandle, formData.githubHandle], 
      });
      console.log(result);
      router.push(`/creator`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
              name="imageUpload"
              accept="image/png, image/jpg, image/jpeg, image/webp"
              onChange={handleChange}
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
  disabled={isButtonDisabled}
  className={ isButtonDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
>
  {isPending ? "Submitting..." : "Submit"}
</Button>

            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatorRegistration;
