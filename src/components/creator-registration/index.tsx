"use client"

import React from "react";
import {  CardContent,Card, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CreatorRegistration = () => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/creator`);
    console.log("Form submitted!");
  };
  return (
    <Card className="max-w-lg mx-auto mt-10 mb-32">
      <CardHeader>
        <CardTitle>Creator Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" placeholder="Enter your name" />
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Write a short bio about yourself" />
          </div>

          {/* Photo Hash */}
          <div>
          <Label htmlFor="imageUpload">Upload photo</Label>
            <Input
              type="file"
              id="imageUpload"
              name="imageUpload"
              accept="image/png, image/jpg, image/jpeg, image/webp"
            />
          </div>

          {/* Twitter Handle */}
          <div>
            <Label htmlFor="twitterHandle">Twitter Handle</Label>
            <Input
              type="text"
              id="twitterHandle"
              placeholder="Enter your Twitter handle"
            />
          </div>

          {/* GitHub Handle */}
          <div>
            <Label htmlFor="githubHandle">GitHub Handle</Label>
            <Input
              type="text"
              id="githubHandle"
              placeholder="Enter your GitHub handle"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-end">
            <Button 
              onClick={handleSubmit} 
            type="submit" variant="default" size="default">
          Submit
        </Button>
        </div>
      
      </CardFooter>
    </Card>
  );
};

export default CreatorRegistration;
