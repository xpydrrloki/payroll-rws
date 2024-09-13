import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FieldInputProps, FormikErrors, FormikTouched } from 'formik';
import { FC } from 'react';
import { Label } from './ui/label';
import { replaceUnderscoreWithSpace } from '@/utils/replaceUnderscoreWithSpace';

interface SelectInputProps {
  field: FieldInputProps<any>;
  label: string;
  options: string[] | any[] |undefined  ;
  placeholder?: string;
  isError?: boolean;
  form: {
    touched: FormikTouched<any>;
    errors: FormikErrors<any>;
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => void;
    values: any;
  };
}
const SelectInput: FC<SelectInputProps> = ({
  field,
  form: { touched, errors, setFieldValue, values },
  placeholder,
  label,
  isError,
  options,
}) => {
  return (
    <div className="my-3 flex w-full flex-col space-y-1.5 h-fit z-30">
      <Label htmlFor={field.name} className={isError ? 'text-red-600' : ''}>
        {label}
      </Label>
      <Select
        onValueChange={(value) => setFieldValue(field.name, value)}
        defaultValue={field.value}
        required={true}

      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder || 'Select an option'} />
        </SelectTrigger>
        <SelectContent className={`${isError ? 'border-red-600' : 'bg-white'} h-fit mb-10`}>
          {options?.map((option, idx) => (
            <SelectItem key={idx} value={option}>
              {typeof option === "string" ? replaceUnderscoreWithSpace(option): option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isError ? (
        <div className="text-xs text-red-500">{String(errors[field.name])}</div>
      ) : null}
    </div>
  );
};

export default SelectInput;
