'use client';

import { Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { useRegisterMutation } from '@/services/auth/hook';
import { ButtonPrimary } from '@/shared/components/dump/atoms';
import { registerSchema } from '@/shared/schemas/registerSchema';
import { extractErrorMessage } from '@/shared/utils';
import { setLocalItem } from '@/shared/utils/storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { z } from 'zod';
import RegisterErrorlabel from '../molecules/errorLabel';
import { useRegisterStore } from '../store/registerStore';

export default function RegisterForm() {
  const t = useTranslations();
  const { nextStep, step } = useRegisterStore();

  const registerMutation = useRegisterMutation();
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');

  const schema = registerSchema(t);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: '',
      fullname: '',
      password: '',
      repeatedPassword: '',
    },
  });

  const handleNext = () => {
    nextStep();
    setLocalItem('stepKey', step + 1);
  };

  // ✅ Submit
  const onSubmit = (values: z.infer<typeof schema>) => {
    registerMutation.mutate(values, {
      onSuccess: () => handleNext(),
      onError: (err) => setRegisterErrorMessage(err),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Hush kelibsiz 😊</h1>

      {registerErrorMessage && (
        <div className="mb-5">
          <RegisterErrorlabel
            icon={<FaInfoCircle />}
            variant="error"
            text={extractErrorMessage(registerErrorMessage)}
            onClose={() => setRegisterErrorMessage('')}
            closable
          />
        </div>
      )}

      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 w-full"
      >
        <Form.Item
          label="Ism Familyangiz"
          validateStatus={errors.fullname ? 'error' : ''}
          help={errors.fullname?.message}
        >
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="To'liq ismingiz" className="!h-12 !rounded-2xl" />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Telefon raqamingiz"
          validateStatus={errors.phone ? 'error' : ''}
          help={errors.phone?.message}
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="+998 90 123 45 67" className="!h-12 !rounded-2xl" />
            )}
          />
        </Form.Item>

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

        <Form.Item
          label="Takroriy parol"
          validateStatus={errors.repeatedPassword ? 'error' : ''}
          help={errors.repeatedPassword?.message}
        >
          <Controller
            name="repeatedPassword"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Parol" className="!h-12 !rounded-2xl" />
            )}
          />
        </Form.Item>

        <Form.Item>
          <ButtonPrimary
            type="primary"
            label={registerMutation.isPending ? 'Yuborilmoqda...' : 'Shaxsiy raqam olish'}
            classNameDy="w-full justify-center"
          />
        </Form.Item>
      </Form>
      <p className="hover:underline text-sm">
        <Link href="/auth/log-in">Avval ro'yhatdan o'tganman</Link>
      </p>
    </div>
  );
}
