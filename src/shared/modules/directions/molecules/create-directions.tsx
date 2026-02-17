"use client";

import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, Select, Button, Spin, message, Divider, Card, InputNumber, Checkbox } from "antd";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaMapMarkerAlt, FaSpinner, FaPlus, FaWeight, FaCube } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useGetFromList, useGetToList } from "@/entities/hooks/Prices/hooks";
import { useCreateDirection } from "@/entities/hooks/directions/hooks";
import { getLocalItem } from "@/shared/utils/storage";
import { toast } from "sonner";

const { Option } = Select;

interface CreateDirectionModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    productId: string;
}

interface PriceItem {
    minWeight: number;
    maxWeight?: number;
    cub3: number;
    overPrice: boolean;
}

// Price Item Card Component
const PriceItemCard: React.FC<{
    name: number;
    index: number | any;
    restField: any;
    fieldsLength: number;
    onRemove: () => void;
    onAdd: () => void;
    form: any;
    isLast: boolean;
}> = ({ name, index, restField, fieldsLength, onRemove, onAdd, form, isLast }) => {
    const isOverPrice = Form.useWatch(["priceList", name, "overPrice"], form);

    return (
        <Card
            className="relative !p-0 transition-all border-none! shadow-none duration-300 flex justify-between items-center"
            bodyStyle={{ padding: "10px", paddingBottom: "0px", marginBottom: "10px" }}
        >
            <div className="flex gap-4 !w-full md:flex-row flex-col">
                {/* Min Weight */}
                <Form.Item
                    {...restField}
                    name={[name, "minWeight"]}
                    className="flex-1"
                    label={index === 0 ? (
                        <span className="flex items-center gap-2 font-medium">
                            <FaWeight className="text-green-500" />
                            Minimal og'irlik (kg)
                        </span>
                    )
                        : <span className="opacity-0">Label</span>}
                    rules={[
                        { required: true, message: "Minimal og'irlikni kiriting" },
                    ]}
                >
                    <InputNumber
                        step={0.1}
                        className="!w-full"
                        size="large"
                        disabled={isOverPrice}
                        placeholder="Masalan: 0.1"
                    />
                </Form.Item>

                {/* Max Weight */}
                <Form.Item
                    {...restField}
                    className="flex-1"
                    name={[name, "maxWeight"]}
                    label={index === 0 ? (
                        <span className="flex items-center gap-2 font-medium">
                            <FaWeight className="text-red-500" />
                            Maksimal og'irlik (kg)
                        </span>
                    ) : <span className="opacity-0">Label</span>
                    }
                    tooltip={index === 0 ? "Cheksiz bo'lsa bo'sh qoldiring" : undefined}
                >
                    <InputNumber
                        step={0.1}
                        className="!w-full"
                        size="large"
                        disabled={isOverPrice}
                        placeholder="Cheksiz bo'lsa bo'sh qoldiring"
                    />
                </Form.Item>

                {/* Cub Price */}
                <Form.Item
                    {...restField}
                    name={[name, "cub3"]}
                    className="flex-1"
                    label={index === 0 ? (
                        <span className="flex items-center gap-2 font-medium">
                            <FaCube className="text-purple-500" />
                            Kub narxi ($)
                        </span>
                    ) : <span className="opacity-0">Label</span>}
                    rules={[{ required: true, message: "Kub narxini kiriting" }]}
                >
                    <InputNumber
                        min={0}
                        step={1000}
                        className="!w-full"
                        size="large"
                        placeholder="Masalan: 50000"
                        formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        }
                        parser={(value: any) => value!.replace(/\s?/g, "")}
                    />
                </Form.Item>

                {/* Action Buttons */}
                <Form.Item
                    label={<span className="opacity-0">Actions</span>}
                    className="mb-0"
                >
                    <div className="flex gap-2 items-center">
                        {fieldsLength > 1 && (
                            <Button
                                danger
                                type="text"
                                icon={<MdDelete size={20} className="!mt-1"/>}
                                onClick={onRemove}
                                className="hover:bg-red-50 h-full"
                                size="large"
                            />
                        )}
                        <Button
                            type="dashed"
                            icon={<FaPlus size={20} className="!mt-1"/>}
                            onClick={onAdd}
                            className="hover:border-blue-500 hover:text-blue-500 h-full"
                            size="large"
                        />
                    </div>
                </Form.Item>
            </div>

            {/* 1000 kg dan yuqori checkbox - faqat oxirgi element uchun */}
            {isLast && (
                <Form.Item
                    {...restField}
                    name={[name, "overPrice"]}
                    valuePropName="checked"
                    className="mb-4"
                >
                    <Checkbox
                        className="text-base font-medium"
                        onChange={(e) => {
                            if (e.target.checked) {
                                form.setFieldValue(["priceList", name, "minWeight"], 1000);
                                form.setFieldValue(["priceList", name, "maxWeight"], undefined);
                            } else {
                                form.setFieldValue(["priceList", name, "minWeight"], null);
                            }
                        }}
                    >
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-semibold">
                            🚀 1000 kg dan yuqori
                        </span>
                    </Checkbox>
                </Form.Item>
            )}
        </Card>
    );
};

export default function CreateDirectionModal({
    open,
    onClose,
    onSuccess,
    productId
}: CreateDirectionModalProps) {
    const t = useTranslations("calculationPage");
    const lang = getLocalItem("lang")?.toString() || "uz";
    const [form] = Form.useForm();

    const [showPriceList, setShowPriceList] = useState(false);
    const [priceListLength, setPriceListLength] = useState(0);
    const toLocationValue = Form.useWatch("to", form);

    // Scroll uchun ref
    const priceListContainerRef = useRef<HTMLDivElement>(null);

    const { data: fromData, isLoading: fromLoading } = useGetFromList(lang);
    const { data: toData, isLoading: toLoading } = useGetToList(lang);
    const { mutate: createDirection, isPending: isCreating } = useCreateDirection();

    // To location tanlanganida price list ko'rsatish
    useEffect(() => {
        if (toLocationValue) {
            setShowPriceList(true);
            // Agar priceList bo'sh bo'lsa, birinchi elementni qo'shamiz
            const currentPriceList = form.getFieldValue("priceList");
            if (!currentPriceList || currentPriceList.length === 0) {
                form.setFieldsValue({
                    priceList: [
                        {
                            minWeight: null,
                            maxWeight: undefined,
                            cub3: null,
                            overPrice: false,
                        },
                    ],
                });
            }
        } else {
            setShowPriceList(false);
        }
    }, [toLocationValue, form]);

    // PriceList uzunligi o'zgarganda scroll pastga
    useEffect(() => {
        if (priceListLength > 0 && priceListContainerRef.current) {
            requestAnimationFrame(() => {
                if (priceListContainerRef.current) {
                    priceListContainerRef.current.scrollTop = priceListContainerRef.current.scrollHeight;
                }
            });
        }
    }, [priceListLength]);

    const onFinish = (values: any) => {
        // Validatsiya
        if (values.priceList && values.priceList.length > 0) {
            const hasError = values.priceList.some((item: PriceItem, idx: number) => {
                if (
                    !item.overPrice &&
                    item.maxWeight !== undefined &&
                    item.maxWeight != null &&
                    item.minWeight >= item.maxWeight
                ) {
                    toast.error(
                        `${idx + 1}-oralig'da Min og'irlik Maxdan katta yoki teng bo'lmasligi kerak`
                    );
                    return true;
                }
                // min qiymat 0 ga teng bo'lishi mumkin, bu xato emas, shuning uchun quyidagi kod olib tashlandi
                return false;
            });

            if (hasError) return;
        }

        const payload = {
            productId: productId,
            fromLocationId: values.from,
            toLocationId: values.to,
            priceList: values.priceList?.map((item: PriceItem) => ({
                minWeight: item.minWeight ?? null,
                maxWeight: item.overPrice ? null : item.maxWeight ?? null,
                cub3: item.cub3 ?? null,
                overPrice: item.overPrice ?? false,
            })) || [],
        };

        createDirection(payload, {
            onSuccess: () => {
                toast.success("Yo'nalish va narxlar muvaffaqiyatli qo'shildi");
                form.resetFields();
                setShowPriceList(false);
                onClose();
                onSuccess?.();
            },
            onError: (err: any) => {
                toast.error("Xatolik: " + (err.message || "Noma'lum xato"));
            },
        });
    };

    const handleCancel = () => {
        form.resetFields();
        setShowPriceList(false);
        onClose();
    };

    return (
        <Modal
            title={
                <div className="text-xl font-bold flex items-center gap-3">
                    <FaMapMarkerAlt className="text-blue-600" />
                    Yangi yo'nalish va narxlar qo'shish
                </div>
            }
            open={open}
            onCancel={handleCancel}
            footer={null}
            width={1000}
            destroyOnClose
            centered
            className="top-8"
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
                    <div className="grid grid-cols-2 gap-4">
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
                            >
                                {toData?.result?.map((loc: any) => (
                                    <Option key={loc.id} value={loc.id}>
                                        {loc.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>

                    {/* Price List Section */}
                    {showPriceList && (
                        <>
                            <Divider orientation="left" className="!mt-6 !mb-4">
                                <span className="flex items-center gap-2 text-lg font-semibold">
                                    <FaWeight className="text-blue-500" />
                                    Yetkazib berish narxlari
                                </span>
                            </Divider>

                            <Form.List name="priceList">
                                {(fields, { add, remove }) => {
                                    // PriceList uzunligini update qilish
                                    if (fields.length !== priceListLength) {
                                        setPriceListLength(fields.length);
                                    }

                                    return (
                                        <div
                                            ref={priceListContainerRef}
                                            className="max-h-[50vh] overflow-y-auto pr-2"
                                            style={{ scrollBehavior: 'smooth' }}
                                        >
                                            {fields.map((field, index) => (
                                                <PriceItemCard
                                                    key={field.key}
                                                    name={field.name}
                                                    index={index}
                                                    restField={field}
                                                    fieldsLength={fields.length}
                                                    onRemove={() => remove(field.name)}
                                                    onAdd={() =>
                                                        add({
                                                            minWeight: null,
                                                            maxWeight: undefined,
                                                            cub3: null,
                                                            overPrice: false,
                                                        })
                                                    }
                                                    form={form}
                                                    isLast={index === fields.length - 1}
                                                />
                                            ))}
                                        </div>
                                    );
                                }}
                            </Form.List>
                        </>
                    )}

                    {/* Submit Buttons */}
                    <Divider />
                    <div className="flex justify-end gap-3">
                        <Button
                            onClick={handleCancel}
                            size="large"
                            className="min-w-[120px]"
                        >
                            Bekor qilish
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isCreating}
                            disabled={isCreating}
                            size="large"
                            className="min-w-[120px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                        >
                            {isCreating ? (
                                <span className="flex items-center gap-2">
                                    <FaSpinner className="animate-spin" />
                                    Saqlanmoqda...
                                </span>
                            ) : (
                                "Saqlash"
                            )}
                        </Button>
                    </div>
                </Form>
            )}
        </Modal>
    );
}