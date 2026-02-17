
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Breadcrumb } from "antd";
import { useDirectionsByProduct } from "@/entities/hooks/directions/hooks";
import PageHeader from "../atoms/PageHeader";
import DirectionsTable from "../organisms/DirectionsTable";
import CreateDirectionModal from "../organisms/CreateDirectionModal";
import { Direction } from "../molecules/DirectionsTableColumns";

const DirectionsPage = () => {
    const params = useParams();
    const router = useRouter();
    const productId = params.productsId as string;

    const [createModalOpen, setCreateModalOpen] = useState(false);

    const { data, isLoading } = useDirectionsByProduct(productId);

    const directions: Direction[] = Array.isArray(data)
        ? data
        : data?.result || data?.content || [];

    return (
        <div>
            {/* Breadcrumb */}
            <div className="mb-4 cursor-pointer">
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => router.push("/client/admin/products")}>
                        Hizmat turi
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Mahsulot yo'nalishlari</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            {/* Header */}
            <PageHeader
                title="Mahsulot yo'nalishlari"
                buttonLabel="Yangi yo'nalish qo'shish"
                onButtonClick={() => setCreateModalOpen(true)}
            />

            {/* Table + Edit/View modals */}
            <DirectionsTable
                data={directions}
                isLoading={isLoading}
                productId={productId}
            />

            {/* Create Modal */}
            <CreateDirectionModal
                productId={productId}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
            />
        </div>
    );
};

export default DirectionsPage;