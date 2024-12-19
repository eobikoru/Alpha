import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant/constant";
import { useContractRead, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { message } from "antd";
import { UserOutlined, TagsOutlined, DollarCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

const ManageTool = () => {
  const { writeContract, isPending, data: hash, isError } = useWriteContract();
  const { data: tools } = useContractRead({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getAllTools",
  });
  const { isSuccess: isSuccessHash } = useWaitForTransactionReceipt({
    hash,
  });

  const [formData, setFormData] = useState({
    toolName: "",
    toolDescription: "",
    toolCategory: "",
    toolPrice: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showTools, setShowTools] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // Success Message
  useEffect(() => {
    if (isSuccessHash) {
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
  }, [isSuccessHash, messageApi]);

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

  const toggleToolsVisibility = () => {
    setShowTools(!showTools);
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
                <label htmlFor="toolPrice">Price (in KAIA)</label>
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

        <div className="mt-6">
          <Button onClick={toggleToolsVisibility}>
            {showTools ? "Hide Tools" : "See All Tools"}
          </Button>
        </div>

        {showTools && (
          <div className="grid gap-4 mt-4 grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
            {tools && Array.isArray(tools) && tools.length > 0 ? (
              tools.map((tool: { id: number; name: string; description: string; category: string; price: number }) => (
                <Card key={tool.id}>
                  <CardContent className="p-4">
                    <div>
                      <p><strong><UserOutlined /> Name:</strong> {tool.name}</p>  
                      <p><strong><TagsOutlined /> Category:</strong> {tool.category}</p>
                      <p><strong><DollarCircleOutlined /> Price:</strong> {tool.price} KAIA</p>
                      <p><strong><InfoCircleOutlined /> Description:</strong> {tool.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No tools available.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageTool;
