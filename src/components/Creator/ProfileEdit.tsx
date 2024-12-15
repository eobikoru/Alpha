"use client";
import { ClipLoader } from "react-spinners";
import React, { ChangeEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant/constant";
import Profile from "./Profile";

const ProfileEdit = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { writeContract, isPending } = useWriteContract();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    photoHash: null,
    twitterHandle: "",
    githubHandle: "",
  });

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

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      await handleSubmission(selectedFile);
    }
  };

  const handleSubmission = async (fileToUpload: string | Blob) => {
    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);
      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
          body: formData,
        }
      );

      const resData = await res.json();
      const ipfsHash = resData.IpfsHash;

      setFormData((prev) => ({
        ...prev,
        photoHash: ipfsHash,
      }));
    } catch (e) {
      alert("Trouble uploading file");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!", formData);

    if (!formData.photoHash) {
      alert("Please upload an image first");
      return;
    }

    try {
      const result = await writeContract({
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
      console.log(result);
    } catch (error) {
      console.error(error);
    }

    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBackClick = () => {
    setIsEditing(false);
  };

  return isEditing ? (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
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
              accept="image/png, image/jpg, image/jpeg, image/webp"
              onChange={changeHandler}
              placeholder="Select an image file"
            />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              value={formData.twitterHandle}
              onChange={handleChange}
              placeholder="Your Twitter handle"
            />
          </div>
          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              value={formData.githubHandle}
              onChange={handleChange}
              placeholder="Your GitHub username"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" onClick={handleSubmit}>
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
