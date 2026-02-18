
interface ProductCardTitleProps {
    nameUz: string;
    nameRu: string;
  }
  
  /**
   * Mahsulot nomi: o'zbekcha (katta) + ruscha (kichik)
   */
  const ProductCardTitle = ({ nameUz, nameRu }: ProductCardTitleProps) => {
    return (
      <div style={{ marginBottom: 12 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 600,
            color: '#1f2937',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {nameUz || '-'}
        </h3>
        <p
          style={{
            margin: '4px 0 0',
            fontSize: 13,
            color: '#6b7280',
          }}
        >
          {nameRu || '-'}
        </p>
      </div>
    );
  };
  
  export default ProductCardTitle;