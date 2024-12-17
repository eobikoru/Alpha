import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant/constant";
import { message } from "antd";
import CustomDatePicker from '../ui/datepicker';
import { Dayjs } from "dayjs";

const Consultation = () => {
  const { writeContract, isPending, isSuccess } = useWriteContract();
  const [formData, setFormData] = useState({
    consultationPrice: "",
    availableSlots: [] as number[]
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      messageApi.open({
        type: "success",
        content: "Operation successful!",
      });

      // Reset form data
      setFormData({
        consultationPrice: "",
        availableSlots: []
      });
    }
  }, [isSuccess, messageApi]);

  useEffect(() => {
    const isFormIncomplete = Object.values(formData).some((value) => !value);
    setIsButtonDisabled(isFormIncomplete);
  }, [formData]);

  const toUnixTimestamp = (isoDate: string): number => {
    const date = new Date(isoDate);
    return Math.floor(date.getTime() / 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      const timestamp = toUnixTimestamp(date.format());
      setFormData((prev) => ({
        ...prev,
        availableSlots: [timestamp]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "setConsultationAvailability",
        args: [
          true,
          formData.consultationPrice,
          formData.availableSlots
        ],
      });
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div>
       {contextHolder}
      <Card>
        <CardHeader>
          <CardTitle>Manage Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label>Available Slots</Label>
              <div>
                <CustomDatePicker
                  onChange={handleDateChange}
                  placeholder="Select date and time"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="consultationPrice">Hourly Rate (in Kaia)</Label>
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
