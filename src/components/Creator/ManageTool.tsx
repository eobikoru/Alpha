"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant/constant";
import { useWriteContract } from "wagmi";
const ManageTool = () => {
  const { writeContract, isPending } = useWriteContract();
  const [formData, setFormData] = useState({
    toolName: "",
    toolDescription: "",
    toolCategory: "",
    toolPrice: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const isFormIncomplete = Object.values(formData).some((value) => !value);
    setIsButtonDisabled(isFormIncomplete);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit =async  (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      const result = await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "addTool",
        args: [], 
      });
      console.log(result);
  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="toolName">Tool Name</Label>
              <Input
                id="toolName"
                placeholder="Enter tool name"
                value={formData.toolName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="toolDescription">Description</Label>
              <Textarea
                id="toolDescription"
                placeholder="Describe your tool"
                value={formData.toolDescription}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="toolCategory">Category</Label>
              <Input
                id="toolCategory"
                placeholder="e.g., DeFi, NFT, DAO"
                value={formData.toolCategory}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="toolPrice">Price (in ETH)</Label>
              <Input
                id="toolPrice"
                type="number"
                step="0.01"
                placeholder="0.1"
                value={formData.toolPrice}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              disabled={isButtonDisabled}
              className={isButtonDisabled ? "cursor-not-allowed" : ""}
            >
             {isPending ? "Adding..." : "Add Tool"}  
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* List of existing tools would go here */}
    </div>
  );
};

export default ManageTool;
