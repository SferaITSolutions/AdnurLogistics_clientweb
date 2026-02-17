// components/atoms/PageHeader.tsx

import { Button } from "antd";
import { FaPlus } from "react-icons/fa";

interface PageHeaderProps {
  title: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

/**
 * Sahifa tepasidagi sarlavha va "Yangi qo'shish" tugmasi.
 */
const PageHeader = ({ title, buttonLabel, onButtonClick }: PageHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl !font-bold !mb-0">{title}</h1>
      <Button
        type="primary"
        size="large"
        icon={<FaPlus />}
        onClick={onButtonClick}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default PageHeader;