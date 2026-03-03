'use client'
import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import Image from 'next/image'
import BgImage from "@/assets/images/auth/Group 48097120.png";
import { useCheckIdentityMutationForForgotPassword, useResentPasswordMutation } from '@/services/auth/hook';
import { toast } from 'sonner';
import { FaSpinner } from 'react-icons/fa';
import { useTranslations } from 'next-intl'; // Next-intl qo'shildi

export default function ForgotPasswordUI() {
    const t = useTranslations("forgotPassword"); // translation hook
    const [otpForm] = Form.useForm();
    const [resetForm] = Form.useForm();
    const [saveIDforRsetPassword, setSaveIDforRsetPassword] = useState<string | null>(null);
    
    const checkIdentityMutation = useCheckIdentityMutationForForgotPassword({
        onSuccess: (response: any) => {
            setSaveIDforRsetPassword(response?.data?.result);
            setStep('resetPassword');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message);
        }
    });

    const resentPasswordMutation = useResentPasswordMutation();
    const [step, setStep] = useState<'verifyOTP' | 'resetPassword'>('verifyOTP');
    const [forgotIdentity, setForgotIdentity] = useState<string | null>(null);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            setForgotIdentity(sessionStorage.getItem("forgot_identity"));
        }
    }, []);

    const handleVerifyOTP = (values: any) => {
        checkIdentityMutation.mutate({
            code: values.otp,
            identity: forgotIdentity as string || '',
        });
    }

    const handleResetPassword = (values: any) => {
        if (values.password !== values.resentPassword) {
            message.error(t("passwordsNotMatch"));
            return;
        }
        resentPasswordMutation.mutate({
            identity: saveIDforRsetPassword as string || '',
            password: values.password,
            resentPassword: values.resentPassword,
        });
    }

    return (
        <div className="flex justify-between gap-10 min-h-screen p-0!">
            <Image
                src={BgImage}
                alt="bg"
                className="max-h-screen hidden lg:block lg:w-1/2 object-cover"
                priority
            />
            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-10 relative overflow-hidden">
                <h1 className="text-2xl font-bold mb-6">
                    {step === "verifyOTP" ? t("verifyTitle") : t("resetTitle")}
                </h1>

                {step === "verifyOTP" && (
                    <Form
                        form={otpForm}
                        onFinish={handleVerifyOTP}
                        layout="vertical"
                        className="w-full max-w-[350px]"
                    >
                        <Form.Item
                            label={t("otpLabel")}
                            name="otp"
                            rules={[{ required: true, message: t("otpRequired") }]}
                        >
                            <Input.OTP length={4} size="large" />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={checkIdentityMutation.isPending}
                                className="w-full h-[45px] rounded-xl"
                            >
                                {checkIdentityMutation.isPending ? <FaSpinner className="animate-spin" /> : t("verifyButton")}
                            </Button>
                        </Form.Item>
                    </Form>
                )}

                {step === "resetPassword" && (
                    <Form
                        form={resetForm}
                        onFinish={handleResetPassword}
                        layout="vertical"
                        className="w-full max-w-[350px]"
                    >
                        <Form.Item
                            label={t("newPasswordLabel")}
                            name="password"
                            rules={[
                                { required: true, message: t("newPasswordRequired") },
                                { min: 4, message: t("passwordMinLength") }
                            ]}
                        >
                            <Input.Password size="large" placeholder={t("newPasswordPlaceholder")} className="rounded-xl" />
                        </Form.Item>

                        <Form.Item
                            label={t("confirmPasswordLabel")}
                            name="resentPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: t("confirmPasswordRequired") },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(t("passwordsNotMatch")));
                                    },
                                })
                            ]}
                        >
                            <Input.Password size="large" placeholder={t("newPasswordPlaceholder")} className="rounded-xl" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={resentPasswordMutation.isPending}
                                className="w-full h-[45px] rounded-xl"
                            >
                                {resentPasswordMutation.isPending ? <FaSpinner className="animate-spin" /> : t("saveButton")}
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </div>
        </div>
    )
}