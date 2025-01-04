
import React from "react";
import {Input} from "@/components/ui/input.jsx";
import { FileSearch } from 'lucide-react';

function DebouncedInput({value: initialValue, onChange, debounce = 500, ...props}) {
  const [value, setValue] = React.useState(initialValue)
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div className='relative'>
      <Input
        {...props}
        className='max-w-[300px] !w-[300px] rounded-3xl sm:w-full border-0'
        placeholder="Поиск по таблице"
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{
          background:
            'linear-gradient(90deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.0289) 99.67%)',
        }}
      />
      <FileSearch className='absolute top-1.5  right-2 text-[#b0b4b8]'/>

    </div>
  )
}

export default DebouncedInput