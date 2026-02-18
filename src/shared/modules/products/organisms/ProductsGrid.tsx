

import { Row, Col, Empty, Spin, Pagination } from 'antd';
import ProductCard, { Product } from '@/shared/modules/products/organisms/ProductCard';

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
  isDeleting: boolean;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, newPageSize: number) => void;
  onEdit: (e: React.MouseEvent, product: Product) => void;
  onDelete: (e: React.MouseEvent | undefined, id: string) => void;
  onCardClick: (id: string) => void;
}

/**
 * Mahsulotlar grid: kartalar, loading, empty state, pagination.
 */
const ProductsGrid = ({
  products,
  isLoading,
  isDeleting,
  total,
  currentPage,
  pageSize,
  onPageChange,
  onEdit,
  onDelete,
  onCardClick,
}: ProductsGridProps) => {
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (products.length === 0) {
    return <Empty description="Hizmat turi topilmadi" />;
  }

  return (
    <>
      <Row gutter={[20, 20]}>
        {products.map((product) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={product.id}>
            <ProductCard
              product={product}
              isDeleting={isDeleting}
              onEdit={onEdit}
              onDelete={onDelete}
              onClick={() => onCardClick(product.id)}
            />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div
        style={{
          marginTop: 32,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          onChange={onPageChange}
          pageSizeOptions={['9', '12', '24', '36', '48']}
        />
      </div>
    </>
  );
};

export default ProductsGrid;