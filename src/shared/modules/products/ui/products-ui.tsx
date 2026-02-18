// app/products/page.tsx
"use client";

import { useProductsPage, useDeleteProduct } from '@/entities/hooks/products-hooks/hooks';
import { Button } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductsGrid from '@/shared/modules/products/organisms/ProductsGrid';
import CreateProductModal from '@/shared/modules/products/organisms/CreateProductModal';
import EditProductModal from '@/shared/modules/products/organisms/EditProductModal';
import { Product } from '@/shared/modules/products/organisms/ProductCard';

const ProductsPage = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);

    const { data, isLoading } = useProductsPage({
        page: currentPage - 1,
        size: pageSize,
    });

    const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

    const products = data?.result?.content || [];
    const total = data?.result?.totalElements || 0;

    const handleEdit = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        setEditingProduct(product);
        setEditModalOpen(true);
    };

    const handleDelete = (e: React.MouseEvent | undefined, id: string) => {
        e?.stopPropagation();
        deleteProduct(id);
    };

    const handlePageChange = (page: number, newPageSize: number) => {
        setCurrentPage(page);
        setPageSize(newPageSize);
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ borderRadius: 12, marginBottom: 24 }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl !font-bold text-gray-800 !mb-1">Hizmat turi</h1>
                        <p className="text-sm text-gray-500 !mb-0">Jami: {total} ta hizmat turi</p>
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => setModalOpen(true)}
                        style={{ borderRadius: 8 }}
                    >
                        + Yangi hizmat turi
                    </Button>
                </div>
            </div>

            {/* Grid */}
            <ProductsGrid
                products={products}
                isLoading={isLoading}
                isDeleting={isDeleting}
                total={total}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCardClick={(id) => router.push(`/client/admin/products/${id}/directions`)}
            />

            {/* Modals */}
            <CreateProductModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSuccess={() => setModalOpen(false)}
            />

            <EditProductModal
                open={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    setEditingProduct(null);
                }}
                product={editingProduct as any}
                onSuccess={() => {
                    setEditModalOpen(false);
                    setEditingProduct(null);
                }}
            />
        </div>
    );
};

export default ProductsPage;