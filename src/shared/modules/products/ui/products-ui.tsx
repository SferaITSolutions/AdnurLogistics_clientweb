"use client"
import { useProductsPage, useDeleteProduct } from '@/entities/hooks/products-hooks/hooks';
import { Button, Card, Tag, Popconfirm, Tooltip, Empty, Spin, Pagination, Row, Col } from 'antd';
import { useState } from 'react';
import CreateProductModal from '../molecules/create-product';
import { AiFillProduct } from 'react-icons/ai';
import EditProductModal from '../molecules/update-product';
import { FaEdit, FaTrash, FaMapMarkerAlt } from 'react-icons/fa';
import { MdLanguage, MdSettings } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ProductsPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
    const router = useRouter();

    const params = {
        page: currentPage - 1,
        size: pageSize,
    };

    const { data, isLoading } = useProductsPage(params);
    const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

    const products = data?.result?.content || [];
    const total = data?.result?.totalElements || 0;

    const handleDelete = (e: any, id: string) => {
        e.stopPropagation();
        deleteProduct(id);
    };

    const handleEdit = (e: any, product: any) => {
        e.stopPropagation();
        setEditingProduct(product);
        setEditModalOpen(true);
    };

    const toggleExpand = (e: any, id: string) => {
        e.stopPropagation();
        setExpandedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Breadcrumb */}

            {/* Header */}
            <div style={{
                borderRadius: 12,
                marginBottom: 24,
                // boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className='text-2xl !font-bold text-gray-800 !mb-1'>
                           Hizmat turi
                        </h1>
                        <p className='text-sm text-gray-500 !mb-0'>
                            Jami: {total} ta hizmat turi
                        </p>
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

            {/* Cards Grid */}
            {isLoading ? (
                <div style={{ textAlign: 'center', padding: 60 }}>
                    <Spin size="large" />
                </div>
            ) : products.length === 0 ? (
                <Empty description="Hizmat turi topilmadi" />
            ) : (
                <>
                    <Row gutter={[20, 20]}>
                        {products.map((product: any) => {
                            const isExpanded = expandedCards.has(product.id);
                            return (
                                <Col xs={24} sm={12} lg={8} xl={6} key={product.id}>
                                    <Card
                                        hoverable
                                        onClick={() => router.push(`/client/admin/products/${product.id}/directions`)}
                                        style={{
                                            borderRadius: 12,
                                            overflow: 'hidden',
                                            height: '100%',
                                            border: '1px solid #f0f0f0',
                                            transition: 'all 0.3s ease'
                                        }}
                                        bodyStyle={{ padding: 0 }}
                                        cover={
                                            <div style={{
                                                height: 200,
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}>
                                                {product.imgUrl ? (
                                                    <img
                                                        src={product.imgUrl}
                                                        alt={product.nameUz}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                ) : (
                                                    <AiFillProduct size={64} color="white" />
                                                )}

                                                {/* Actions Overlay */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: 12,
                                                    right: 12,
                                                    display: 'flex',
                                                    gap: 8
                                                }}>
                                                    <Tooltip title="Tahrirlash">
                                                        <Button
                                                            type="primary"
                                                            shape="circle"
                                                            icon={<FaEdit />}
                                                            onClick={(e) => handleEdit(e, product)}
                                                            style={{
                                                                background: 'rgba(255, 255, 255, 0.9)',
                                                                color: '#faad14',
                                                                border: 'none'
                                                            }}
                                                        />
                                                    </Tooltip>
                                                    <Popconfirm
                                                        title="Mahsulotni o'chirish"
                                                        description={`"${product.nameUz}" ni o'chirasizmi?`}
                                                        onConfirm={(e) => handleDelete(e, product.id)}
                                                        okText="Ha"
                                                        cancelText="Yo'q"
                                                        okButtonProps={{ danger: true, loading: isDeleting }}
                                                    >
                                                        <Tooltip title="O'chirish">
                                                            <Button
                                                                danger
                                                                shape="circle"
                                                                icon={<FaTrash />}
                                                                onClick={(e) => e.stopPropagation()}
                                                                style={{
                                                                    background: 'rgba(255, 255, 255, 0.9)',
                                                                    border: 'none'
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </Popconfirm>
                                                </div>

                                                {/* Weight Badge */}
                                                {product.calculateKg && (
                                                    <Tag
                                                        color="green"
                                                        style={{
                                                            position: 'absolute',
                                                            bottom: 12,
                                                            left: 12,
                                                            margin: 0,
                                                            borderRadius: 6
                                                        }}
                                                    >
                                                        Og'irlik bo'yicha
                                                    </Tag>
                                                )}
                                            </div>
                                        }
                                    >
                                        {/* Content */}
                                        <div style={{ padding: 16 }}>
                                            {/* Title */}
                                            <div style={{ marginBottom: 12 }}>
                                                <h3 style={{
                                                    margin: 0,
                                                    fontSize: 16,
                                                    fontWeight: 600,
                                                    color: '#1f2937',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {product.nameUz || '-'}
                                                </h3>
                                                <p style={{
                                                    margin: '4px 0 0',
                                                    fontSize: 13,
                                                    color: '#6b7280'
                                                }}>
                                                    {product.nameRu || '-'}
                                                </p>
                                            </div>

                                            {/* Description */}
                                            <p style={{
                                                fontSize: 13,
                                                color: '#6b7280',
                                                lineHeight: 1.5,
                                                marginBottom: 12,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical'
                                            }}>
                                                {product.descriptionUz || 'Ta\'rif mavjud emas'}
                                            </p>

                                            {/* Languages Toggle */}
                                            <div style={{
                                                borderTop: '1px solid #f0f0f0',
                                                paddingTop: 12,
                                                marginTop: 12
                                            }}>
                                                <Button
                                                    type="text"
                                                    size="small"
                                                    icon={<MdLanguage />}
                                                    onClick={(e) => toggleExpand(e, product.id)}
                                                    style={{
                                                        fontSize: 12,
                                                        color: '#6b7280',
                                                        padding: '4px 8px'
                                                    }}
                                                >
                                                    {isExpanded ? 'Yashirish' : 'Boshqa tillar'}
                                                </Button>

                                                {/* Expanded Languages */}
                                                {isExpanded && (
                                                    <div style={{
                                                        marginTop: 12,
                                                        padding: 12,
                                                        background: '#f9fafb',
                                                        borderRadius: 8,
                                                        fontSize: 12
                                                    }}>
                                                        <div style={{ marginBottom: 8 }}>
                                                            <Tag color="purple" style={{ marginRight: 8 }}>EN</Tag>
                                                            {product.nameEn || '-'}
                                                        </div>
                                                        <div style={{ marginBottom: 8 }}>
                                                            <Tag color="orange" style={{ marginRight: 8 }}>TR</Tag>
                                                            {product.nameTr || '-'}
                                                        </div>
                                                        <div>
                                                            <Tag color="red" style={{ marginRight: 8 }}>CN</Tag>
                                                            {product.nameZh || '-'}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Go to Locations */}
                                            <Button
                                                type="primary"
                                                icon={<MdSettings />}
                                                style={{
                                                    // padding: 0,
                                                    marginTop: 8,
                                                    fontSize: 12
                                                }}
                                            >
                                                Hizmatni sozlash
                                            </Button>
                                        </div>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>

                    {/* Pagination */}
                    <div style={{
                        marginTop: 32,
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={total}
                            showSizeChanger
                            // showTotal={(total) => `Jami: ${total} ta`}
                            onChange={(page, newPageSize) => {
                                setCurrentPage(page);
                                setPageSize(newPageSize);
                            }}
                            pageSizeOptions={['9','12', '24', '36', '48']}
                        />
                    </div>
                </>
            )}

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
                product={editingProduct}
                onSuccess={() => {
                    setEditModalOpen(false);
                    setEditingProduct(null);
                }}
            />
        </div>
    );
};

export default ProductsPage;