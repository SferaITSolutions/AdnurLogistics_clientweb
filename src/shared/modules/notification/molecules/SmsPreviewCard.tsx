
import { Button, Card, Space, Typography } from 'antd';
import { FiCopy } from 'react-icons/fi';

const { Title, Text, Paragraph } = Typography;

interface SmsPreviewCardProps {
  message: string;
  onCopy: () => void;
}

/**
 * "Yuboriladigan SMS namunasi" bloki:
 * vaqt + matn + "Nusxalash" tugmasi.
 */
const SmsPreviewCard = ({ message, onCopy }: SmsPreviewCardProps) => {
  return (
    <div className="mt-8">
      <Title level={4}>Yuboriladigan SMS namunasi</Title>

      <Card className="bg-gray-50">
        <Space direction="vertical" className="w-full">
          <div className="mb-3">
            <Text type="secondary" className="text-xs">
              {new Date().toLocaleTimeString('uz-UZ')}
            </Text>
          </div>
          <Paragraph className="whitespace-pre-line !mb-0">
            {message || 'Namuna mavjud emas'}
          </Paragraph>
        </Space>
      </Card>

      {message && (
        <Button
          type="default"
          icon={<FiCopy />}
          onClick={onCopy}
          className="!mt-3"
        >
          Matnni nusxalash
        </Button>
      )}
    </div>
  );
};

export default SmsPreviewCard;