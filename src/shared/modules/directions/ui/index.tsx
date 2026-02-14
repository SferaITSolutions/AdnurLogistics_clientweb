"use client";

import { useParams } from "next/navigation";
import { Spin, Table, Button, Popconfirm, Tooltip, message } from "antd";
import { useState } from "react";
import { useDirectionsByProduct, useDeleteDirection } from "@/entities/hooks/directions/hooks";
import CreateDirectionModal from "../molecules/create-directions";
import { FaDollarSign, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import EditDirectionModal from "../molecules/update-direction";
import ViewDirectionPricesModal from "../molecules/view-directions";
import AddDeliveryPricesModal from "../molecules/create-delevery-prices";

// Direction tipi (sizning backenddan qaytganiga moslashtiring)
interface Direction {
    id: string;
    productId: string;
    fromLocationId: string;
    toLocationId: string;
    fromLocationName?: string;  // agar backenddan nom kelsa
    toLocationName?: string;
    // nameUz yoki boshqa maydon bo‘lsa qo‘shing
}

const DirectionsPage = () => {
    const params = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const productId = params.productsId as string; // yoki params.productId / params["product-id"]
    const [editModalOpen, setEditModalOpen] = useState(false);
    // const [editingDirection, setEditingDirection] = useState<Direction | null>(null);
    const [viewModalOpen, setViewModalOpen] = useState(false); // yangi state
    const [editingDirection, setEditingDirection] = useState<Direction | null>(null);
    const [viewingDirectionId, setViewingDirectionId] = useState<string | null>(null); // yangi state
    const [addPricesModalOpen, setAddPricesModalOpen] = useState(false);
    const [selectedDirectionForPrices, setSelectedDirectionForPrices] = useState<Direction | null>(null);
    const handleView = (record: Direction) => {
        setViewingDirectionId(productId);
        setViewModalOpen(true);
    };
    const handleOpenAddPrices = (record: Direction) => {
        setSelectedDirectionForPrices(record);
        setAddPricesModalOpen(true);
    };
    console.log(productId, "productId from params");

    const { data, isLoading } = useDirectionsByProduct(productId);

    // O‘chirish hooki
    const { mutate: deleteDirection, isPending: isDeleting } = useDeleteDirection();

    const directions = Array.isArray(data) ? data : data?.result || data?.content || [];

    // Har bir qatorga index qo‘shib, jadval uchun tayyor qilamiz
    const tableData = directions.map((item: Direction, index: number) => ({
        ...item,
        index: index + 1,
    }));

    const handleDelete = (e: React.MouseEvent | undefined, directionId: string) => {
        // Popconfirm ichida e ni to‘xtatish shart emas, chunki Popconfirm o‘zi boshqaradi
        deleteDirection(
            { id: directionId, productId },
            {
                onSuccess: () => {
                    message.success("Yo‘nalish muvaffaqiyatli o‘chirildi");
                },
                onError: (err: any) => {
                    message.error("O‘chirishda xato: " + (err.message || "Noma‘lum xato"));
                },
            }
        );
    };

    const columns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            width: 60,
            align: "center" as const,
        },
        {
            title: "Qayerdan (From)",
            dataIndex: "fromLocationName",
            key: "fromLocationId",
            render: (text: string, record: Direction) =>
                record.fromLocationName || record.fromLocationId || "-",
        },
        {
            title: "Qayerga (To)",
            dataIndex: "toLocationName",
            key: "toLocationId",
            render: (text: string, record: Direction) =>
                record.toLocationName || record.toLocationId || "-",
        },
        {
            title: "Yetkazish narxlari",
            key: "prices-actions",
            width: 220,
            align: "center" as const,
            render: (_: any, record: Direction) => (
                <div className="flex items-center justify-center gap-3">
                    {/* Ko‘rish tugmasi (Eye) */}
                    <Button
                        type="text"
                        icon={<FaEye className="text-blue-600" size={20} />}
                        onClick={() => handleView(record)} // oldingi ko'rish funksiyasi
                        title="Narxlarni ko‘rish"
                    />

                    {/* Narx qo‘shish tugmasi */}
                    <Button
                        type="text"
                        icon={<FaDollarSign className="text-green-600" size={20} />}
                        onClick={() => handleOpenAddPrices(record)}
                        title="Ushbu yo‘nalish uchun narx qo‘shish"
                    />
                </div>
            ),
        },
        {
            title: "Amallar",
            key: "actions",
            width: 140,
            align: "center" as const,
            render: (_: any, record: Direction) => (
                <div className="flex items-center justify-center gap-3">
                    {/* <Tooltip title="Tahrirlash" className="!bg-none"> */}
                    <Button
                        type="text"
                        shape="circle"
                        icon={<FaEdit color="orange" size={20} />}
                        onClick={() => {
                            setEditingDirection(record);
                            setEditModalOpen(true);
                        }}
                    />
                    {/* </Tooltip> */}

                    {/* oldingi o'chirish Popconfirm */}
                    <Popconfirm
                        title="Yo'nalishni o'chirish"
                        description="Bu yo'nalishni haqiqatan ham o'chirmoqchimisiz?"
                        onConfirm={(e) => handleDelete(e, record.id)}
                        okText="Ha, o'chirish"
                        cancelText="Yo'q"
                        okButtonProps={{ danger: true, loading: isDeleting }}
                    >
                        <Tooltip title="O'chirish">
                            <Button
                                danger
                                type="text"
                                // shape="circle"
                                icon={<FaTrash />}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </Tooltip>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6 text-2xl font-bold text-gray-800 ">
                {/* <div className=""> */}
                <h1 className="text-2xl !font-bold !mb-0 items-center">Mahsulot yo‘nalishlari</h1>
                {/* </div> */}
                <Button type="primary" onClick={() => setModalOpen(true)}>
                    + Yangi yo‘nalish qo‘shish
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={tableData}
                loading={isLoading}
                rowKey="id"
                pagination={false}
                locale={{ emptyText: "Bu mahsulot uchun yo‘nalishlar mavjud emas" }}
            />

            <CreateDirectionModal
                productId={productId}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSuccess={() => {
                    // agar kerak bo‘lsa qo‘shimcha yangilash
                }}
            />
            <ViewDirectionPricesModal
                open={viewModalOpen}
                onClose={() => {
                    setViewModalOpen(false);
                    setViewingDirectionId(null);
                }}
                directionId={viewingDirectionId}
            />
            <EditDirectionModal
                open={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    setEditingDirection(null);
                }}
                direction={editingDirection}
                onSuccess={() => {
                    // agar kerak bo'lsa qo'shimcha yangilash
                }}
            />
            <AddDeliveryPricesModal
                open={addPricesModalOpen}
                onClose={() => {
                    setAddPricesModalOpen(false);
                    setSelectedDirectionForPrices(null);
                }}
                directionId={selectedDirectionForPrices?.id || ""}
                onSuccess={() => {
                    setAddPricesModalOpen(false);
                    setSelectedDirectionForPrices(null);
                }}
            />
        </div>
    );
};

export default DirectionsPage;