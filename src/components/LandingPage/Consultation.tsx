import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWriteContract, useWaitForTransactionReceipt} from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constant/constant";
import { message } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Consultation = () => {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const [formData, setFormData] = useState({
    availableSlots: [] as number[],
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { isSuccess: isSuccessHash } = useWaitForTransactionReceipt({
    hash,
  });

  // const [showSlots, setShowSlots] = useState(false);
  // const { data: consultationSlots, isLoading } = useContractRead({
  //   abi: CONTRACT_ABI,
  //   address: CONTRACT_ADDRESS,
  //   functionName: "getAllConsultationSlots",
  // });

  useEffect(() => {
    if (isSuccessHash) {
      messageApi.open({
        type: "success",
        content: "Operation successful!",
      });

      setFormData({
        // consultationPrice: "",
        availableSlots: [],
      });
      setSelectedDate(null);
    }
  }, [isSuccessHash, messageApi]);

  useEffect(() => {
    const isFormIncomplete = Object.values(formData).some((value) => !value || value.length === 0);
    setIsButtonDisabled(isFormIncomplete);
  }, [formData]);

  const toUnixTimestamp = (date: Date): number => {
    return Math.floor(date.getTime() / 1000);
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [id]: value,
  //   }));
  // };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "setConsultationAvailability",
        args: [formData.availableSlots],
      });
    } catch (error) {
      console.error(error);
    }
  };

  // const toggleShowSlots = () => {
  //   setShowSlots((prev) => !prev);
  // };

  return (
    <div className="mb-36">
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
              {/* <Label htmlFor="consultationPrice">Hourly Rate (in KAIA)</Label>
              <Input
                id="consultationPrice"
                type="number"
                step="0.01"
                placeholder="0.5"
                value={formData.consultationPrice}
                onChange={handleChange}
              /> */}
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

      {/* <div className="mt-6">
        <Button onClick={toggleShowSlots}>{showSlots ? "Hide Slots" : "See All Slots"}</Button>
      </div>

      {showSlots && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {isLoading ? (
            <p>Loading slots...</p>
          ) : consultationSlots && Array.isArray(consultationSlots) && consultationSlots.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            consultationSlots.map((slot: any) => (
              <Card key={slot.id}>
                <CardHeader>
                  <CardTitle>Slot ID: {slot.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Creator: {slot.creator}</p>
                  <p>Date: {new Date(slot.timestamp * 1000).toLocaleString()}</p>
                  <p>Status: {slot.isBooked ? "Booked" : "Available"}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No consultation slots available.</p>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Consultation;
