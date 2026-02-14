"use client";

import React from "react";
import { Modal, Form, Select, Button, Spin, message } from "antd";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import { useGetFromList, useGetToList } from "@/entities/hooks/Prices/hooks";
import { useCreateDirection } from "@/entities/hooks/directions/hooks"; // oldingi hook
import { getLocalItem } from "@/shared/utils/storage";

const { Option } = Select;

interface CreateDirectionModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void; // muvaffaqiyatdan keyin jadvalni yangilash uchun
    productId: string;
}

export default function CreateDirectionModal({
    open,
    onClose,
    onSuccess,
    productId
}: CreateDirectionModalProps) {
    const t = useTranslations("calculationPage"); // yoki o‘zingizning namespace
    const params = useParams();
    //   const productId = params.productId as string; // yoki params["product-id"]

    const lang = getLocalItem("lang")?.toString() || "uz";

    const [form] = Form.useForm();

    const { data: fromData, isLoading: fromLoading } = useGetFromList(lang);
    const { data: toData, isLoading: toLoading } = useGetToList(lang);

    const { mutate: createDirection, isPending: isCreating } = useCreateDirection();

    const onFinish = (values: any) => {
        // if (!productId) {
        //   message.error("Mahsulot ID topilmadi");
        //   return;
        // }

        const payload = {
            productId: productId,
            fromLocationId: values.from,
            toLocationId: values.to,
        };

        createDirection(payload, {
            onSuccess: () => {
                message.success("Yo'nalish muvaffaqiyatli qo'shildi");
                form.resetFields();
                onClose();
                onSuccess?.(); // jadvalni yangilash uchun chaqiriladi
            },
            onError: (err: any) => {
                message.error("Xatolik: " + (err.message || "Noma'lum xato"));
            },
        });
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title={
                <div className="text-xl font-bold flex items-center gap-3">
                    <FaMapMarkerAlt className="text-blue-600" />
                    Yangi yo‘nalish qo‘shish
                </div>
            }
            open={open}
            onCancel={handleCancel}
            footer={null}
            width={600}
            destroyOnClose
            centered
        >
            {(fromLoading || toLoading) ? (
                <div className="flex justify-center items-center h-48">
                    <Spin size="large" tip="Joylashuvlar yuklanmoqda..." />
                </div>
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="mt-4"
                >
                    {/* From Location */}
                    <Form.Item
                        label={
                            <span className="flex items-center gap-2 font-medium">
                                <FaMapMarkerAlt className="text-blue-600" />
                                {t("fromLabel")}
                            </span>
                        }
                        name="from"
                        rules={[{ required: true, message: t("fromPlaceholder") }]}
                    >
                        <Select
                            placeholder={t("fromPlaceholder")}
                            size="large"
                            showSearch
                            optionFilterProp="children"
                            loading={fromLoading}
                            filterOption={(input, option) =>
                                String(option?.children ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            notFoundContent={
                                fromLoading && <Spin size="small" /> 
                            }
                        >
                            {fromData?.result?.map((loc: any) => (
                                <Option key={loc.id} value={loc.id}>
                                    {loc.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* To Location */}
                    <Form.Item
                        label={
                            <span className="flex items-center gap-2 font-medium">
                                <FaMapMarkerAlt className="text-red-600" />
                                {t("toLabel")}
                            </span>
                        }
                        name="to"
                        rules={[{ required: true, message: t("toPlaceholder") }]}
                    >
                        <Select
                            placeholder={t("toPlaceholder")}
                            size="large"
                            showSearch
                            optionFilterProp="children"
                            loading={toLoading}
                            filterOption={(input, option) =>
                                String(option?.children ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            notFoundContent={
                                toLoading ? <Spin size="small" /> : t("noLocationsFound")
                            }
                        >
                            {toData?.result?.map((loc: any) => (
                                <Option key={loc.id} value={loc.id}>
                                    {loc.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Tugmalar */}
                    <Form.Item className="mt-8 text-right">
                        <Button
                            onClick={handleCancel}
                            className="mr-3"
                            size="large"
                        >
                            Bekor qilish
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isCreating}
                            disabled={isCreating}
                            size="large"
                            className="!px-8"
                        >
                            {isCreating ? (
                                <span className="flex items-center gap-2">
                                    <FaSpinner className="animate-spin" />
                                    Qo‘shilmoqda...
                                </span>
                            ) : (
                                "Yo‘nalish qo‘shish"
                            )}
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
}