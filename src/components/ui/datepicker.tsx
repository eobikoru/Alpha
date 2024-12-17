import React from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import  { Dayjs } from "dayjs"; // Import dayjs for type compatibility

interface CustomDatePickerProps extends Omit<DatePickerProps<Dayjs>, "format"> {
  format?: string; // Optional custom date format
  onChange: (date: Dayjs | null) => void; // Corrected to match Dayjs type
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  format = "DD/MM/YYYY hh:mm A",
  showTime = { use12Hours: true },
  onChange,
  ...props
}) => {
  return (
    <DatePicker
      {...props}
      format={format} // Use the provided format
      showTime={showTime} // Show time picker if needed
      onChange={onChange} // Pass onChange handler directly
    />
  );
};

export default CustomDatePicker;
