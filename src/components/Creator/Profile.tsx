import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
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
          <Button type="submit">Update Profile</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Profile;
