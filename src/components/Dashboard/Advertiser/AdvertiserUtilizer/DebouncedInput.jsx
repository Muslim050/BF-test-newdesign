import React from "react";
import {Input} from "@/components/ui/input.jsx";

function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }) {
  const [value, setValue] = React.useState(initialValue);

  // Синхронизация внутреннего значения с внешним `initialValue`
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Добавляем debounce-логику
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, onChange, debounce]); // Добавлены все зависимости

  return (
    <Input
      style={{borderRadius: "14px", padding: "5px 10px", height: "auto"}}
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default DebouncedInput;
