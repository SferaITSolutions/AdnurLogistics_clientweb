
interface ProductDescriptionProps {
    description: string;
  }
  
  /**
   * Maksimal 2 qatorli tavsif.
   */
  const ProductDescription = ({ description }: ProductDescriptionProps) => {
    return (
      <p
        style={{
          fontSize: 13,
          color: '#6b7280',
          lineHeight: 1.5,
          marginBottom: 12,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {description || "Ta'rif mavjud emas"}
      </p>
    );
  };
  
  export default ProductDescription;