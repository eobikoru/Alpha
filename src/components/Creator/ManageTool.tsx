"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ManageTool = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="toolName">Tool Name</Label>
              <Input id="toolName" placeholder="Enter tool name" />
            </div>
            <div>
              <Label htmlFor="toolDescription">Description</Label>
              <Textarea id="toolDescription" placeholder="Describe your tool" />
            </div>
            <div>
              <Label htmlFor="toolCategory">Category</Label>
              <Input id="toolCategory" placeholder="e.g., DeFi, NFT, DAO" />
            </div>
            <div>
              <Label htmlFor="toolPrice">Price (in ETH)</Label>
              <Input
                id="toolPrice"
                type="number"
                step="0.01"
                placeholder="0.1"
              />
            </div>
            <Button type="submit">Add Tool</Button>
          </form>
        </CardContent>
      </Card>
      {/* List of existing tools would go here */}
    </div>
  );
};

export default ManageTool;
