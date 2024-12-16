import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant/constant";
import { message } from "antd";
const Consultation = () => {
  const { writeContract,  isPending, isError, isSuccess } = useWriteContract();
  const [formData, setFormData] = useState({
    availability: "",
    consultationPrice: "",
  });
  const [messageApi] = message.useMessage();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // Success Message
  useEffect(() => {
    if (isSuccess) {
      messageApi.open({
        type: "success",
        content: "Tool added successfully!",
      });
      setFormData({
        availability: "",
        consultationPrice: "",
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

  // Enable/disable the button based on form completeness
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
    console.log("Form submitted:", formData);
    try {
      const result = await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "setConsultationAvailability",
        args: [formData.availability, formData. consultationPrice], 
      });
      console.log(result);
  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="availability">Set Your Availability</Label>
              <Textarea
                id="availability"
                placeholder="e.g., Mon-Fri, 9AM-5PM UTC"
                value={formData.availability}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="consultationPrice">Hourly Rate (in ETH)</Label>
              <Input
                id="consultationPrice"
                type="number"
                step="0.01"
                placeholder="0.5"
                value={formData.consultationPrice}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              disabled={isButtonDisabled}
              className={isButtonDisabled ? "cursor-not-allowed" : ""}
            >
             {isPending ? "Updating..." : "Update Availability"}    
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Consultation;
