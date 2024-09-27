'use client';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Department } from '@/types/employee.type';

interface JobSelectProps {
  jobs: Department[];
  departmentId: number;
  jobTitleId: number;
  setDepartmentId: Dispatch<SetStateAction<number>>;
  setJobTitleId: Dispatch<SetStateAction<number>>;
}

const JobSelect: FC<JobSelectProps> = ({
  jobs,
  departmentId,
  jobTitleId,
  setDepartmentId,
  setJobTitleId,
}) => {
  const handleChangeDepartment = (value: string) => {
    if (value !== '0') {
      setDepartmentId(Number(value));
      setJobTitleId(0);
    } else if (value === '0') {
      setDepartmentId(0);
    }
  };
  return (
    <div className="flex items-center gap-x-8">
      <div className="w-48">
        <Label htmlFor={'departmentId'}>{'Departemen'}</Label>
        <Select
          name="departmentId"
          onValueChange={(value) => handleChangeDepartment(value)}
          defaultValue={String(departmentId)}
        >
          <SelectTrigger>
            <SelectValue placeholder={'Pilih Departemen'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All</SelectItem>
            {jobs?.map((job, idx) => (
              <SelectItem key={idx} value={String(job.id)}>
                {job.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div
        className={`${departmentId == 0 ? 'w-0 text-transparent border-none' : 'w-48 '} transition-all duration-200`}
      >
        <Label htmlFor={'jobTitleId'}>{'Jabatan'}</Label>
        <Select
          name="jobTitleId"
          onValueChange={(val) =>
            val !== '0' ? setJobTitleId(Number(val)) : setJobTitleId(0)
          }
          value={String(jobTitleId)}
          defaultValue="0"
        >
          <SelectTrigger
            className={`${departmentId == 0 ? 'w-0 hidden border-none' : 'w-48 '} transition-all duration-200`}
          >
            <SelectValue placeholder={'Pilih Jabatan'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All</SelectItem>
            {jobs[departmentId == 0 ? 0 : departmentId - 1].JobTitle.map(
              (title, idx) => (
                <SelectItem key={idx} value={String(title.id)}>
                  {title.name}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobSelect;
