'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useFormik } from 'formik';
import React from 'react';
import { LoginValidationSchema } from './schemas/LoginValidationSchema';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useLoginMutation from '@/hooks/api/auth/useLoginMutation';
import FormInput from '@/components/FormInput';

const Login: React.FC = () => {
  const { mutateAsync } = useLoginMutation();
  const router = useRouter();
  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: LoginValidationSchema,
      onSubmit: (values) => {
        mutateAsync(values);
      },
    });

  return (
    <main className="container mx-auto px-4 min-h-screen">
      <div className="mt-32 flex justify-center">
        <Card className="w-[350px] shadow-xl">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-2xl ">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <FormInput
                  name="username"
                  label="Username"
                  error={errors.username}
                  isError={!!touched.username && !!errors.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="username"
                  type="text"
                  value={values.username}
                />

                <FormInput
                  name="password"
                  label="Password"
                  error={errors.password}
                  isError={!!touched.password && !!errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="password"
                  type="password"
                  value={values.password}
                />
                {/* <p
                  onClick={() => router.push('/forgot-password')}
                  className="cursor-pointer text-xs underline"
                >
                  Forgot password?
                </p> */}
                <Button type="submit" className=" mt-6 w-full text-white">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            {/* <div className="flex justify-start gap-1 text-xs font-extralight">
              Don&apos;t have have an account?
              <Link href="/register" className="underline">
                <p> Register</p>
              </Link>
            </div> */}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Login;
