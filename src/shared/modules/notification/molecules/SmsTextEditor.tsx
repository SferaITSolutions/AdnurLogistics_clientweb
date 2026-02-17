import { Button, Input, Space, Typography } from 'antd';
import { FiSave } from 'react-icons/fi';

const { TextArea } = Input;
const { Text } = Typography;

interface SmsTextEditorProps {
  message: string;
  editedMessage: string;
  isEditing: boolean;
  isActive: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
}

/**
 * SMS matni: ko'rish rejimi + tahrirlash rejimi birgalikda.
 * - Faol bo'lmasa, "Tahrirlash uchun avval xabarni yoqing" xabari chiqadi.
 * - Tahrirlash rejimida Saqlash/Bekor qilish tugmalari ko'rinadi.
 */
const SmsTextEditor = ({
  message,
  editedMessage,
  isEditing,
  isActive,
  isSaving,
  onEdit,
  onSave,
  onCancel,
  onChange,
}: SmsTextEditorProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Text strong>SMS matni</Text>
        {!isEditing && isActive && (
          <Button type="link" onClick={onEdit} disabled={isSaving}>
            Tahrirlash
          </Button>
        )}
      </div>

      <TextArea
        value={isEditing ? editedMessage : message || 'Matn mavjud emas'}
        onChange={(e) => onChange(e.target.value)}
        readOnly={!isEditing}
        disabled={!isActive && !isEditing}
        autoSize={{ minRows: 4, maxRows: 10 }}
        placeholder="SMS matnini kiriting"
        className={!isActive && !isEditing ? 'bg-gray-100' : ''}
      />

      {isEditing && (
        <Space className="mt-3">
          <Button
            type="primary"
            icon={<FiSave />}
            onClick={onSave}
            loading={isSaving}
          >
            Saqlash
          </Button>
          <Button onClick={onCancel} disabled={isSaving}>
            Bekor qilish
          </Button>
        </Space>
      )}

      {!isActive && !isEditing && (
        <Text type="secondary" className="text-xs block mt-2">
          Tahrirlash uchun avval xabarni yoqing
        </Text>
      )}
    </div>
  );
};

export default SmsTextEditor;