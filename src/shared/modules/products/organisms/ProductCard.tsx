
import { Card, Button } from 'antd';
import { useState } from 'react';
import { MdSettings } from 'react-icons/md';
import ProductCardCover from '@/shared/modules/products/atoms/ProductCardCover';
import ProductCardTitle from '@/shared/modules/products/atoms/ProductCardTitle';
import ProductDescription from '@/shared/modules/products/atoms/ProductDescription';
import LanguageToggleSection from '@/shared/modules/products/molecules/LanguageToggleSection';

interface Product {
  id: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  nameTr: string;
  nameZh: string;
  descriptionUz: string;
  imgUrl?: string;
  calculateKg: boolean;
}

interface ProductCardProps {
  product: Product;
  isDeleting: boolean;
  onEdit: (e: React.MouseEvent, product: Product) => void;
  onDelete: (e: React.MouseEvent | undefined, id: string) => void;
  onClick: () => void;
}

/**
 * Bitta mahsulot kartasi: rasm, nom, tavsif, boshqa tillar, sozlash tugmasi.
 */
const ProductCard = ({
  product,
  isDeleting,
  onEdit,
  onDelete,
  onClick,
}: ProductCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <Card
      hoverable
      onClick={onClick}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        height: '100%',
        border: '1px solid #f0f0f0',
        transition: 'all 0.3s ease',
      }}
      bodyStyle={{ padding: 0 }}
      cover={
        <ProductCardCover
          imgUrl={product.imgUrl}
          nameUz={product.nameUz}
          calculateKg={product.calculateKg}
          onEdit={(e) => onEdit(e, product)}
          onDelete={(e) => onDelete(e, product.id)}
          isDeleting={isDeleting}
        />
      }
    >
      <div style={{ padding: 16 }}>
        <ProductCardTitle nameUz={product.nameUz} nameRu={product.nameRu} />
        <ProductDescription description={product.descriptionUz} />

        <LanguageToggleSection
          nameEn={product.nameEn}
          nameTr={product.nameTr}
          nameZh={product.nameZh}
          isExpanded={isExpanded}
          onToggle={handleToggle}
        />

        <Button
          type="primary"
          icon={<MdSettings />}
          style={{
            marginTop: 8,
            fontSize: 12,
          }}
        >
          Hizmatni sozlash
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
export type { Product };