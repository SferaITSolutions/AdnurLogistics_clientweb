
import { Button, Popconfirm, Tag, Tooltip } from 'antd';
import { AiFillProduct } from 'react-icons/ai';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface ProductCardCoverProps {
  imgUrl?: string;
  nameUz: string;
  calculateKg: boolean;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e?: React.MouseEvent) => void;
  isDeleting: boolean;
}

/**
 * Karta ustki qismi: gradient/rasm + tahrirlash/o'chirish tugmalari + calculateKg badge
 */
const ProductCardCover = ({
  imgUrl,
  nameUz,
  calculateKg,
  onEdit,
  onDelete,
  isDeleting,
}: ProductCardCoverProps) => {
  return (
    <div
      style={{
        height: 200,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={nameUz}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <AiFillProduct size={64} color="white" />
      )}

      {/* Actions Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'flex',
          gap: 8,
        }}
      >
        <Tooltip title="Tahrirlash">
          <Button
            type="primary"
            shape="circle"
            icon={<FaEdit />}
            onClick={onEdit}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#faad14',
              border: 'none',
            }}
          />
        </Tooltip>

        <Popconfirm
          title="Mahsulotni o'chirish"
          description={`"${nameUz}" ni o'chirasizmi?`}
          onConfirm={onDelete}
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
                border: 'none',
              }}
            />
          </Tooltip>
        </Popconfirm>
      </div>

      {/* Weight Badge */}
      {calculateKg && (
        <Tag
          color="green"
          style={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            margin: 0,
            borderRadius: 6,
          }}
        >
          Og'irlik bo'yicha
        </Tag>
      )}
    </div>
  );
};

export default ProductCardCover;