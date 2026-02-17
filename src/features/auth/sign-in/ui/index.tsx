"use client";

import { Link, useRouter } from "@/i18n/routing";
import {
  deformatPhone,
  deformatPhoneTR,
  formatPhone,
  formatPhoneTR,
} from "@/shared/utils/formatter";
import { Form, Input } from "antd";
import { FaInfoCircle, FaSpinner } from "react-icons/fa";

import BgImage from "@/assets/images/auth/Group 48097120.png";
import {
  useCheckPhoneMutation,
  useLoginMutation,
  useCheckIdentityMutation,
} from "@/services/auth/hook";
import { ButtonPrimary } from "@/shared/components/dump/atoms";
import SelectBefore from "@/shared/components/dump/atoms/select-before";
import { useGlobalStore } from "@/shared/store/globalStore";
import { extractErrorMessage } from "@/shared/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useRef } from "react";
import LoginErrorlabel from "../molecules/errorLabel";

export default function SignInUI() {
  const t = useTranslations("login");
  const navigate = useRouter();
  const checkPhoneMutation = useCheckPhoneMutation();
  const loginMutation = useLoginMutation();
  const checkIdentityMutation = useCheckIdentityMutation();

  const { beforePhone } = useGlobalStore();
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [step, setStep] = useState<"phone" | "password" | "otp">("phone");
  const [phoneValue, setPhoneValue] = useState("");
  const [otpUid, setOtpUid] = useState("");
  const [form] = Form.useForm();
  const [otpForm] = Form.useForm();

  // Add refs to keep the latest entered password for storing in sessionStorage
  const passwordRef = useRef<string>("");

  // phone number normalization
  const getFormattedPhone = (raw: string) =>
    beforePhone === "+998"
      ? formatPhone(raw, true)
      : formatPhoneTR(raw, true);

  const getDeformattedPhone = (raw: string) =>
    beforePhone === "+998"
      ? deformatPhone(raw)
      : deformatPhoneTR(raw);

  const handlePhoneSubmit = async (values: any) => {
    const { phone } = values;
    const cleanPhone = getDeformattedPhone(phone);
    setPhoneValue(phone);

    checkPhoneMutation.mutate(cleanPhone, {
      onSuccess: (response: any) => {
        if (response?.data.result === true) {
          setStep("password");
        } else if (response?.data?.result) {
          setOtpUid(response.data.result);
          setStep("otp");
        } else {
          setLoginErrorMessage(t("phoneNotRegistered"));
        }
      },
      onError: (error: any) => {
        setLoginErrorMessage(extractErrorMessage(error));
      },
    });
  };

  const handlePasswordSubmit = async (values: any) => {
    // Store entered password in ref for possible later use in sessionStorage, if needed on register
    passwordRef.current = values.password;
    const cleanPhone = getDeformattedPhone(phoneValue || values.phone);
    loginMutation.mutate(
      {
        phone: cleanPhone,
        password: values.password,
      },
      {
        onError: (error: any) => {
          setLoginErrorMessage(extractErrorMessage(error));
        },
      }
    );
  };

  const handleOtpSubmit = async (values: any) => {
    try {
      const { otp } = values;
      if (!otp || !otpUid) return;
      await checkIdentityMutation.mutateAsync({
        code: otp.toString(),
        identity: otpUid,
      });

      if (phoneValue) {
        const cleanPhone = getDeformattedPhone(phoneValue);
        sessionStorage.setItem("register_phone", cleanPhone);
      }

      setStep("phone");
      setOtpUid("");
      navigate.push("/auth/register");
    } catch (e: any) {
      setLoginErrorMessage(extractErrorMessage(e));
    }
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
        <h1 className="text-5xl font-bold mb-4">{t("title")}</h1>

        {step === "phone" && (
          <Form
            layout="vertical"
            form={form}
            onFinish={handlePhoneSubmit}
            className="w-full max-w-[350px]"
          >
            <Form.Item
              label={t("phone")}
              name="phone"
              rules={[
                { required: true, message: t("phonePlaceholder") },
                {
                  pattern: /^(?:\+998\s|\+90\s)?\d{2,3}\s\d{3}\s\d{2}\s\d{2}$/,
                  message: `${t("phoneFormat")}: ${
                    beforePhone === "+998"
                      ? "+998 90 123 45 67"
                      : "+90 123 123 1234"
                  }`,
                },
              ]}
            >
              <Input
                size="large"
                addonBefore={<SelectBefore />}
                onChange={(e) => {
                  form.setFieldsValue({
                    phone: getFormattedPhone(e.target.value),
                  });
                }}
                placeholder={
                  beforePhone === "+998" ? "90 123 45 67" : "123 123 1234"
                }
                disabled={checkPhoneMutation.isPending}
              />
            </Form.Item>

            {loginErrorMessage && (
              <div className="mb-5">
                <LoginErrorlabel
                  icon={<FaInfoCircle />}
                  variant="error"
                  text={extractErrorMessage(loginErrorMessage)}
                  onClose={() => setLoginErrorMessage("")}
                  closable
                />
              </div>
            )}

            <Form.Item>
              <ButtonPrimary
                classNameDy="w-full justify-center !py-3 !mt-5"
                type="primary"
                label={t("title")}
                Icon={
                  checkPhoneMutation.isPending && (
                    <FaSpinner className="animate-spin text-blue-500" />
                  )
                }
                htmlType="submit"
                disabled={checkPhoneMutation.isPending}
              />
            </Form.Item>
          </Form>
        )}

        {step === "password" && (
          <Form
            layout="vertical"
            form={form}
            onFinish={handlePasswordSubmit}
            className="w-full max-w-[350px]"
          >
            <Form.Item label={t("phone")}>
              <Input
                size="large"
                addonBefore={<SelectBefore />}
                value={phoneValue}
                disabled
              />
            </Form.Item>
            <Form.Item
              label={t("password")}
              name="password"
              rules={[{ required: true, message: t("passwordPlaceholder") }]}
            >
              <Input.Password
                size="large"
                placeholder={t("passwordPlaceholder")}
                disabled={loginMutation.isPending}
              />
            </Form.Item>
            {loginErrorMessage && (
              <div className="mb-5">
                <LoginErrorlabel
                  icon={<FaInfoCircle />}
                  variant="error"
                  text={extractErrorMessage(loginErrorMessage)}
                  onClose={() => setLoginErrorMessage("")}
                  closable
                />
              </div>
            )}
            <Form.Item>
              <ButtonPrimary
                classNameDy="w-full justify-center !py-3 !mt-5"
                type="primary"
                Icon={
                  loginMutation.isPending && (
                    <FaSpinner className="animate-spin text-blue-500" />
                  )
                }
                label={t("button")}
                htmlType="submit"
                disabled={loginMutation.isPending}
              />
            </Form.Item>
          </Form>
        )}

        {step === "otp" && (
          <Form
            form={otpForm}
            onFinish={handleOtpSubmit}
            layout="vertical"
            className="w-full max-w-[350px]"
          >
            <Form.Item
              label={t("otpCode")}
              name="otp"
              rules={[
                { required: true, message: t("otpRequired") },
              ]}
            >
              <Input size="large" maxLength={6} />
            </Form.Item>

            {loginErrorMessage && (
              <div className="mb-4">
                <LoginErrorlabel
                  icon={<FaInfoCircle />}
                  variant="error"
                  text={extractErrorMessage(loginErrorMessage)}
                  onClose={() => setLoginErrorMessage("")}
                  closable
                />
              </div>
            )}

            <Form.Item>
              <ButtonPrimary
                classNameDy="w-full justify-center !py-3"
                type="primary"
                htmlType="submit"
                label={t("otpConfirm")}
                disabled={checkIdentityMutation.isPending}
                Icon={
                  checkIdentityMutation.isPending && (
                    <FaSpinner className="animate-spin text-blue-500" />
                  )
                }
              />
            </Form.Item>
          </Form>
        )}

        {/* <p className="underline text-blue-500 text-sm mt-4">
          <Link href="/auth/register">{t("register")}</Link>
        </p> */}
      </div>
    </div>
  );
}
