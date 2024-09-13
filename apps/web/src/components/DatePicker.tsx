'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Dispatch, FC, SetStateAction } from 'react';
import { Label } from './ui/label';

interface DatePickerProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  isError?: boolean;
  name: string;
  label?: string;
}

const DatePicker: FC<DatePickerProps> = ({
  date,
  setDate,
  name,
  isError,
  label,
}) => {
  const newDate = new Date();
  const fromYear = newDate.getFullYear() - 50;
  const toYear = newDate.getFullYear();

  return (
    <div className='my-3 flex w-full flex-col space-y-1.5'>
      <Label htmlFor={name} className={isError ? 'text-red-600' : ''}>
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          ref={(ref) =>
            ref?.addEventListener('touchend', (e) => e.preventDefault())
          }
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            showOutsideDays={false}
            captionLayout="dropdown"
            fromYear={fromYear}
            toYear={toYear}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default DatePicker;
