'use client';

import {
  deformatPhone,
  deformatPhoneTR,
  formatPhone,
  formatPhoneTR,
} from '@/shared/utils/formatter';
import { Form, Input } from 'antd';

import BgImage from '@/assets/images/auth/Group 48097120.png';
import { useLoginMutation } from '@/services/auth/hook';
import { ButtonPrimary } from '@/shared/components/dump/atoms';
import SelectBefore from '@/shared/components/dump/atoms/select-before';
import { loginSchema } from '@/shared/schemas/loginSchema';
import { useGlobalStore } from '@/shared/store/globalStore';
import { extractErrorMessage } from '@/shared/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { z } from 'zod';
import LoginErrorlabel from '../molecules/errorLabel';

export default function SignInUI() {
  const t = useTranslations();
  const navigate = useRouter();
  const loginMutation = useLoginMutation();
  const { beforePhone } = useGlobalStore();
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  // Zod schema orqali validatsiya
  const schema = loginSchema(t);
  const [form] = Form.useForm();

  const onSubmit = (values: z.infer<typeof schema>) => {
    const { phone, password } = values;
    const cleanData = {
      password,
      phone: beforePhone === '+998' ? deformatPhone(phone) : deformatPhoneTR(phone),
    };

    loginMutation.mutate(cleanData, {
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
        <Form layout="vertical" form={form} onFinish={onSubmit} className="w-full max-w-[350px]">
          {/* Telefon */}
          <Form.Item
            label="Telefon raqamingiz"
            name="phone"
            rules={[
              { required: true, message: 'Telefon raqamni kiriting!' },
              {
                pattern: /^(?:\+998\s|\+90\s)?\d{2,3}\s\d{3}\s\d{2}\s\d{2}$/,
                message: `Telefon raqam formati: ${
                  beforePhone === '+998' ? '+998 90 123 45 67' : '+90 123 123 1234'
                }`,
              },
            ]}
          >
            <Input
              size="large"
              addonBefore={<SelectBefore />}
              onChange={(e) => {
                form.setFieldsValue({
                  phone:
                    beforePhone === '+998'
                      ? formatPhone(e.target.value, true)
                      : formatPhoneTR(e.target.value, true),
                });
              }}
              placeholder={beforePhone === '+998' ? '90 123 45 67' : '123 123 1234'}
            />
          </Form.Item>

          {/* Parol */}
          <Form.Item
            label="Parol"
            name="password"
            rules={[{ required: true, message: 'Parolni kiriting' }]}
          >
            <Input.Password size="large" placeholder="Parol" />
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
              classNameDy="w-full justify-center !py-3 !mt-5"
              type="primary"
              label={loginMutation.isPending ? 'Kirish...' : 'Kirish'}
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
