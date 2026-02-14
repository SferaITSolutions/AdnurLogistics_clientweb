'use client';

import { Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { useCheckIdentityMutation } from '@/services/auth/hook';
import { ButtonPrimary } from '@/shared/components/dump/atoms';
import { identitySchema } from '@/shared/schemas/identitySchema';
import { extractErrorMessage } from '@/shared/utils';
import { setLocalItem } from '@/shared/utils/storage';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import z from 'zod';
import RegisterErrorlabel from '../molecules/errorLabel';
import { useRegisterStore } from '../store/registerStore';

export default function PersonalNumber() {
  const t = useTranslations("personalNumberPage");

  const { nextStep, step, phone, setPhone } = useRegisterStore();
  const checkCheckIdentity = useCheckIdentityMutation();
  const [checkintertityErrorMessage, setCheckintertityErrorMessage] = useState('');
  const schema = identitySchema(t);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      code: '',
    },
  });

  const handleNext = () => {
    nextStep();
    setLocalItem('stepKey', step + 1);
  };

  const onFinish = (value: { code: string }) => {
    console.log(value);

    checkCheckIdentity.mutate(value.code, {
      onSuccess: () => handleNext(),
      onError: (err) => setCheckintertityErrorMessage(err),
    });
  };

  return (
    <div className="w-full max-w-md">
      <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Form.Item
          label={t("label")}
          name="code"
          validateStatus={errors.code ? 'error' : ''}
          help={errors.code?.message}
        >
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <div className="flex justify-center">
                <Input.OTP
                  length={4}
                  {...field}
                  size="large"
                  className=" [&_.ant-otp-input]:!w-16 [&_.ant-otp-input]:!h-25 [&_.ant-otp-input]:!text-2xl [&_.ant-otp-input]:!font-bold "
                />
              </div>
            )}
          />

          {checkintertityErrorMessage && (
            <div className="my-5">
              <RegisterErrorlabel
                icon={<FaInfoCircle />}
                variant="error"
                text={extractErrorMessage(checkintertityErrorMessage)}
                onClose={() => setCheckintertityErrorMessage('')}
                closable
              />
            </div>
          )}
        </Form.Item>
        <ButtonPrimary type="primary" label={t("button")} classNameDy="w-full justify-center" />
      </Form>
    </div>
  );
}