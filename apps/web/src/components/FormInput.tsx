'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/helper/formatCurrency';
import { FormikHandlers } from 'formik';
import { HTMLInputTypeAttribute, useEffect, useState } from 'react';

interface FormInputProps {
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  value: string;
  isError: boolean;
  error: string | undefined;
  label?: string;
  disabled?: boolean;
  isCurrency?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  onBlur,
  onChange,
  placeholder,
  type = 'text',
  value,
  error,
  isError,
  disabled,
  isCurrency = false,
}) => {
  // const [displayValue, setDisplayValue] = useState(value);
  
  // // useEffect(() => {

  // //     setDisplayValue(value);
    
  // // }, [value, isCurrency]);

  // const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const rawValue = e.target.value;

  //   if (isCurrency) {
  //     // Remove any formatting to get raw number
  //     const numberValue = formatCurrency(rawValue)
  //     await new Promise<void>((res)=>setTimeout(res, 500))
  //     setDisplayValue(numberValue); // Update the raw display value for input
  //     onChange(e); // Call Formik's onChange to update Formik state with raw number
  //   } else {
  //     setDisplayValue(rawValue);
  //     onChange(e); // Call Formik's onChange to update Formik state
  //   }
  // };

  // const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   if (isCurrency) {
  //     // Format the value as currency on blur
  //     const formattedValue = formatCurrency(displayValue);
  //     setDisplayValue(formattedValue);
  //     // Update Formik state with formatted value for submission
  //     onChange({ target: { name, value: displayValue.replace(/[^0-9]/g, "") } });
  //   }

  //   onBlur(e); // Call Formik's onBlur to track touched state
  // };
  return (
    <div className="my-3 flex w-full flex-col space-y-1.5">
      <Label htmlFor={name} className={isError ? 'text-red-600' : ''}>
        {label}
      </Label>
      <Input
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`${isError ? 'border-red-600' : 'bg-marine-100'}`}
        disabled={disabled}
      />
      {isError ? <div className="text-xs text-red-500">{error}</div> : null}
    </div>
  );
};

export default FormInput;
