// components/molecules/NewsCardActions.tsx

import { Popconfirm, Spin } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface NewsCardActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

const NewsCardActions = ({ onEdit, onDelete, isDeleting }: NewsCardActionsProps) => {
  return (
    <div className="flex gap-2 justify-end">
      <button
        onClick={onEdit}
        className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
      >
        <FaEdit />
      </button>

      <Popconfirm
        title="O'chirish"
        description="Ushbu yangilikni o'chirishga ishonchingiz komilmi?"
        okText="Ha"
        cancelText="Yo'q"
        okButtonProps={{ danger: true }}
        onConfirm={onDelete}
      >
        <button
          disabled={isDeleting}
          className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium disabled:opacity-50"
        >
          {isDeleting ? <Spin size="small" /> : <MdDelete />}
        </button>
      </Popconfirm>
    </div>
  );
};

export default NewsCardActions;