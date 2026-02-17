// components/atoms/ModalFooterButtons.tsx

import { Button } from "antd";
import { FaSpinner } from "react-icons/fa";

interface ModalFooterButtonsProps {
  onCancel: () => void;
  isLoading: boolean;
  submitLabel?: string;
  loadingLabel?: string;
}

/**
 * Modal oxiridagi "Bekor qilish" va "Saqlash" tugmalari.
 * htmlType="submit" ishlatiladi, shuning uchun Form ichida bo'lishi kerak.
 */
const ModalFooterButtons = ({
  onCancel,
  isLoading,
  submitLabel = "Saqlash",
  loadingLabel = "Saqlanmoqda...",
}: ModalFooterButtonsProps) => {
  return (
    <div className="flex justify-end gap-3">
      <Button onClick={onCancel} size="large" className="min-w-[120px]">
        Bekor qilish
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        loading={isLoading}
        disabled={isLoading}
        size="large"
        className="min-w-[120px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <FaSpinner className="animate-spin" />
            {loadingLabel}
          </span>
        ) : (
          submitLabel
        )}
      </Button>
    </div>
  );
};

export default ModalFooterButtons;