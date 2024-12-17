import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWriteContract ,useWaitForTransactionReceipt} from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant/constant";
import { message } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Consultation = () => {
  const { writeContract,data:hash, isPending, isSuccess } = useWriteContract();
  const [formData, setFormData] = useState({
    consultationPrice: "",
    availableSlots: [] as number[],
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const {isLoading, isSuccess:isSuccessHash} = useWaitForTransactionReceipt({
    hash,
  })
  useEffect(() => {
    if (isSuccessHash) {
      messageApi.open({
        type: "success",
        content: "Operation successful!",
      });

      setFormData({
        consultationPrice: "",
        availableSlots: [],
      });
      setSelectedDate(null); 
    }
  }, [isSuccessHash, messageApi]);


  useEffect(() => {
    const isFormIncomplete = Object.values(formData).some((value) => !value || value.length === 0);
    setIsButtonDisabled(isFormIncomplete);
  }, [formData]);

  // Convert ISO date to Unix timestamp
  const toUnixTimestamp = (date: Date): number => {
    return Math.floor(date.getTime() / 1000);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle date selection
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date); // Update selected date for display
    if (date) {
      const timestamp = toUnixTimestamp(date);
      setFormData((prev) => ({
        ...prev,
        availableSlots: [timestamp],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        availableSlots: [],
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "setConsultationAvailability",
        args: [true, formData.consultationPrice, formData.availableSlots],
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
                 <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText="Select date and time"
                isClearable
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="border w-full px-3 py-2 rounded"
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