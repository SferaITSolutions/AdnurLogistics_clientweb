
import { Button, Tag } from 'antd';
import { MdLanguage } from 'react-icons/md';

interface LanguageToggleSectionProps {
  nameEn: string;
  nameTr: string;
  nameZh: string;
  isExpanded: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

/**
 * "Boshqa tillar" tugmasi + ochilgan holat (EN/TR/CN).
 */
const LanguageToggleSection = ({
  nameEn,
  nameTr,
  nameZh,
  isExpanded,
  onToggle,
}: LanguageToggleSectionProps) => {
  return (
    <div
      style={{
        borderTop: '1px solid #f0f0f0',
        paddingTop: 12,
        marginTop: 12,
      }}
    >
      <Button
        type="text"
        size="small"
        icon={<MdLanguage />}
        onClick={onToggle}
        style={{
          fontSize: 12,
          color: '#6b7280',
          padding: '4px 8px',
        }}
      >
        {isExpanded ? 'Yashirish' : 'Boshqa tillar'}
      </Button>

      {isExpanded && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            background: '#f9fafb',
            borderRadius: 8,
            fontSize: 12,
          }}
        >
          <div style={{ marginBottom: 8 }}>
            <Tag color="purple" style={{ marginRight: 8 }}>
              EN
            </Tag>
            {nameEn || '-'}
          </div>
          <div style={{ marginBottom: 8 }}>
            <Tag color="orange" style={{ marginRight: 8 }}>
              TR
            </Tag>
            {nameTr || '-'}
          </div>
          <div>
            <Tag color="red" style={{ marginRight: 8 }}>
              CN
            </Tag>
            {nameZh || '-'}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageToggleSection;