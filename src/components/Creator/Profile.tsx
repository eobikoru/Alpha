"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CreatorRegistration = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleBackClick = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself" />
            </div>
            <div>
              <Label htmlFor="imageUpload">Upload photo</Label>
              <Input
                type="file"
                id="imageUpload"
                name="imageUpload"
                accept="image/png, image/jpg, image/jpeg, image/webp"
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input id="twitter" placeholder="Your Twitter handle" />
            </div>
            <div>
              <Label htmlFor="github">GitHub</Label>
              <Input id="github" placeholder="Your GitHub username" />
            </div>
            <div className="flex justify-end space-x-4">
              <Button type="button" onClick={handleSaveClick}>Save Profile</Button>
              <Button type="button" variant="secondary" onClick={handleBackClick}>Back</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto mt-10 mb-32">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border border-gray-300"
            />
            <div>
              <Label>Name</Label>
              <p className="text-gray-700">John Doe</p>
            </div>
          </div>
          <div>
            <Label>Bio</Label>
            <p className="text-gray-700">A passionate developer who loves to create amazing web applications.</p>
          </div>
          <div>
            <Label>Twitter</Label>
            <p className="text-gray-700">@johndoe</p>
          </div>
          <div>
            <Label>GitHub</Label>
            <p className="text-gray-700">github.com/johndoe</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-end">
          <Button type="button" onClick={handleEditClick}>Edit Profile</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CreatorRegistration;
