'use client';

import { Controller, useForm } from 'react-hook-form';
import { Form, Input } from 'antd';

import BgImage from '@/assets/images/auth/Group 48097120.png';
import { ButtonPrimary } from '@/shared/components/dump/atoms';
import { FaInfoCircle } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import LoginErrorlabel from '../molecules/errorLabel';
import { extractErrorMessage } from '@/shared/utils';
import { logger } from '@/shared/utils/logger';
import { loginSchema } from '@/shared/schemas/loginSchema';
import { useLoginMutation } from '@/services/auth/hook';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignInUI() {
  const t = useTranslations();
  const navigate = useRouter();
  const loginMutation = useLoginMutation();
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  // Zod schema orqali validatsiya
  const schema = loginSchema(t);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: '998',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    logger.log(values);

    loginMutation.mutate(values, {
      onSuccess: () => navigate.push('/client/dashboard'),
      onError: (err) => setLoginErrorMessage(err),
    });
  };

  return (
    <div className="flex justify-between gap-10 min-h-screen">
      <Image
        src={BgImage}
        alt="bg"
        className="max-h-screen hidden lg:block lg:w-1/2 object-cover"
        priority
      />
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-10 relative overflow-hidden">
        <h1 className="text-5xl font-bold mb-4">Kirish</h1>
        {/* ✅ React Hook Form + AntD */}
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="w-full max-w-[350px]">
          {/* Telefon */}
          <Form.Item
            label="Telefon raqamingiz"
            validateStatus={errors.phone ? 'error' : ''}
            help={errors.phone?.message}
          >
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="+998901234567" className="!h-12 !rounded-2xl" />
              )}
            />
          </Form.Item>

          {/* Parol */}
          <Form.Item
            label="Parol"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password {...field} placeholder="Parol" className="!h-12 !rounded-2xl" />
              )}
            />
          </Form.Item>
          {loginErrorMessage && (
            <div className="mb-5">
              <LoginErrorlabel
                icon={<FaInfoCircle />}
                variant="error"
                text={extractErrorMessage(loginErrorMessage)}
                onClose={() => setLoginErrorMessage('')}
                closable
              />
            </div>
          )}

          {/* Tugma */}
          <Form.Item>
            <ButtonPrimary
              classNameDy="w-full justify-center"
              type="primary"
              label={loginMutation.isPending ? 'Kirish...' : 'Kirish'}
              // htmlType="submit"
            />
          </Form.Item>
        </Form>
        <p className="hover:underline text-sm">
          <Link href="/auth/register">Ro'yhatdan o'tish</Link>
        </p>
      </div>
    </div>
  );
}
