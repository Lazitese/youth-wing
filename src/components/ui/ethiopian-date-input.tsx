
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

interface EthiopianDateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

const EthiopianDateInput = React.forwardRef<HTMLInputElement, EthiopianDateInputProps>(
  ({ className, error, value, onChange, ...props }, ref) => {
    const [date, setDate] = React.useState("");
    const [month, setMonth] = React.useState("");

    React.useEffect(() => {
      // Parse initial value if provided
      if (value) {
        const [d, m] = value.split("/");
        setDate(d || "");
        setMonth(m || "");
      }
    }, []);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = e.target.value;
      if (newDate === "" || (/^\d{1,2}$/.test(newDate) && parseInt(newDate) <= 30)) {
        setDate(newDate);
        updateValue(newDate, month);
      }
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMonth = e.target.value;
      if (newMonth === "" || (/^\d{1,2}$/.test(newMonth) && parseInt(newMonth) <= 13)) {
        setMonth(newMonth);
        updateValue(date, newMonth);
      }
    };

    const updateValue = (newDate: string, newMonth: string) => {
      const formattedDate = newDate.padStart(2, "0");
      const formattedMonth = newMonth.padStart(2, "0");
      onChange(`${formattedDate}/${formattedMonth}/2017`);
    };

    return (
      <div className={cn("flex items-center gap-1", className)}>
        <Input
          type="text"
          value={date}
          onChange={handleDateChange}
          placeholder="ቀን"
          className="w-16 text-center"
          maxLength={2}
          error={error}
          ref={ref}
          {...props}
        />
        <span className="text-gray-500">/</span>
        <Input
          type="text"
          value={month}
          onChange={handleMonthChange}
          placeholder="ወር"
          className="w-16 text-center"
          maxLength={2}
          error={error}
        />
        <span className="text-gray-500">/2017 ዓም</span>
      </div>
    );
  }
);

EthiopianDateInput.displayName = "EthiopianDateInput";

export { EthiopianDateInput }; 
