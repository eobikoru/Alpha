"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant/constant";
import { useWriteContract } from "wagmi";
import { message } from "antd";

const ManageTool = () => {
  const { writeContract, isPending, isError, isSuccess } = useWriteContract();
  const [formData, setFormData] = useState({
    toolName: "",
    toolDescription: "",
    toolCategory: "",
    toolPrice: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  // Success Message
  useEffect(() => {
    if (isSuccess) {
      messageApi.open({
        type: "success",
        content: "Tool added successfully!",
      });
      setFormData({
        toolName: "",
        toolDescription: "",
        toolCategory: "",
        toolPrice: "",
      });
    }
  }, [isSuccess, messageApi]);

  useEffect(() => {
    if (isError) {
      messageApi.open({
        type: "error",
        content: "This operation failed",
      });
    }
  }, [isError, messageApi]);

  // Form Validation
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "addTool",
        args: [
          formData?.toolName,
          formData?.toolDescription,
          formData?.toolCategory,
          formData?.toolPrice,
        ],
      });
      console.log("Transaction result:", result);
    } catch (error) {
      console.error("Error adding tool:", error);
      messageApi.open({
        type: "error",
        content: "Failed to add tool. Please try again.",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Add New Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="toolName">Tool Name</label>
                <Input
                  id="toolName"
                  placeholder="Enter tool name"
                  value={formData.toolName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="toolDescription">Description</label>
                <Textarea
                  id="toolDescription"
                  placeholder="Describe your tool"
                  value={formData.toolDescription}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="toolCategory">Category</label>
                <Input
                  id="toolCategory"
                  placeholder="e.g., DeFi, NFT, DAO"
                  value={formData.toolCategory}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="toolPrice">Price (in ETH)</label>
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
      </div>
    </>
  );
};

export default ManageTool;
