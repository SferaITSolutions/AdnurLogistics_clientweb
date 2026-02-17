// components/organisms/NewsDetailModal.tsx

import { Modal } from "antd";
import NewsImage from "../atoms/NewsImage";
import StatusLabel from "../atoms/StatusLabel";
import NewsForm from "../molecules/NewsForm";
import {
  EditModalFooter,
  StatusModalFooter,
} from "../molecules/ModalFooter";
import { NewsItem } from "./NewsCard";

type ModalType = "view" | "edit" | "status";

interface NewsDetailModalProps {
  open: boolean;
  modalType: ModalType;
  editForm: NewsItem | null;
  isUpdating: boolean;
  isUpdatingStatus: boolean;
  onClose: () => void;
  onEditChange: (values: NewsItem) => void;
  onSave: () => void;
  onStatusConfirm: () => void;
}

const NewsDetailModal = ({
  open,
  modalType,
  editForm,
  isUpdating,
  isUpdatingStatus,
  onClose,
  onEditChange,
  onSave,
  onStatusConfirm,
}: NewsDetailModalProps) => {
  const getFooter = () => {
    if (modalType === "status") {
      return (
        <StatusModalFooter
          onCancel={onClose}
          onConfirm={onStatusConfirm}
          isLoading={isUpdatingStatus}
        />
      );
    }
    if (modalType === "edit") {
      return (
        <EditModalFooter
          onCancel={onClose}
          onSave={onSave}
          isLoading={isUpdating}
        />
      );
    }
    return null;
  };

  const renderContent = () => {
    if (modalType === "status") {
      return (
        <div className="text-center py-6">
          <div className="mb-4 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">📢</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Yangilikni e'lon qilish
          </h2>
          <p className="text-gray-600">
            Ushbu yangilikni barcha foydalanuvchilarga ko'rsatish?
          </p>
        </div>
      );
    }

    if (modalType === "view" && editForm) {
      return (
        <div className="p-6">
          <NewsImage
            src={editForm.imgUrl}
            alt={editForm.title}
            className="w-full h-80 object-cover rounded-xl mb-6"
          />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {editForm.title}
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {editForm.content}
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Holati:</span>
            <StatusLabel status={editForm.status} />
          </div>
        </div>
      );
    }

    if (modalType === "edit" && editForm) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Yangilikni tahrirlash
          </h2>
          <NewsForm
            values={{
              title: editForm.title,
              content: editForm.content,
              imgUrl: editForm.imgUrl,
            }}
            onChange={(vals) => onEditChange({ ...editForm, ...vals })}
            disabled={isUpdating}
            initialImgUrl={editForm.imgUrl}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      footer={getFooter()}
      width={900}
      className="rounded-2xl overflow-hidden"
    >
      {renderContent()}
    </Modal>
  );
};

export default NewsDetailModal;