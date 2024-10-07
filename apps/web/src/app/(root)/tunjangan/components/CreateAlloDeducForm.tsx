'use client';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { useFormikContext } from 'formik';
import { Loader2 } from 'lucide-react';
import React, { FC } from 'react';

interface CreateAlloDeducFormProps {
  formType: 'tunjangan' | 'potongan';
  isPending: boolean;
}

const CreateAlloDeducForm: FC<CreateAlloDeducFormProps> = ({
  isPending,
  formType,
}) => {
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    values,
    touched,
    setFieldValue,
    resetForm,
  } = useFormikContext<{ name: string; amount: number; description: string }>();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <FormInput
          name="name"
          label={`Jenis ${formType as string}`}
          error={errors.name}
          isError={!!touched.name && !!errors.name}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={`Jenis ${formType as string}`}
          type="text"
          value={values.name}
        />
        <FormInput
          name="amount"
          label={`Jumlah ${formType as string}`}
          error={errors.amount}
          isError={!!touched.amount && !!errors.amount}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={`Jumlah ${formType as string}`}
          type="number"
          value={String(values.amount)}
        />
        <FormInput
          name="description"
          label={`Deskripsi ${formType as string}`}
          error={errors.description}
          isError={!!touched.description && !!errors.description}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={`Deskripsi ${formType as string}`}
          type="text"
          value={values.description}
        />
        <Button
          type="submit"
          className=" mt-6 w-full text-white z-0"
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? 'Processing' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default CreateAlloDeducForm;
