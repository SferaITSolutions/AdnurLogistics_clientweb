// components/organisms/CreateNewsModal.tsx

import { Modal } from "antd";
import { useState } from "react";
import { CreateModalFooter } from "../molecules/ModalFooter";
import NewsForm from "../molecules/NewsForm";

interface CreateNewsModalProps {
  open: boolean;
  isCreating: boolean;
  onClose: () => void;
  onCreate: (values: { title: string; content: string; imgUrl: string }, status: "PUBLIC" | "DRAFT") => void;
}

const INITIAL_FORM = { title: "", content: "", imgUrl: "" };

const CreateNewsModal = ({
  open,
  isCreating,
  onClose,
  onCreate,
}: CreateNewsModalProps) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [uploaderKey, setUploaderKey] = useState(0);

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setUploaderKey((prev) => prev + 1);
    onClose();
  };

  const handleCreate = (status: "PUBLIC" | "DRAFT") => {
    onCreate(form, status);
    setForm(INITIAL_FORM);
    setUploaderKey((prev) => prev + 1);
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      centered
      footer={
        <CreateModalFooter
          onCancel={handleClose}
          onDraft={() => handleCreate("DRAFT")}
          onPublish={() => handleCreate("PUBLIC")}
          isLoading={isCreating}
        />
      }
      width={900}
      className="rounded-2xl overflow-hidden"
      title={
        <span className="text-2xl font-bold text-gray-900">
          Yangi yangilik yaratish
        </span>
      }
    >
      <NewsForm
        values={form}
        onChange={setForm}
        disabled={isCreating}
        uploaderKey={uploaderKey}
      />
    </Modal>
  );
};

export default CreateNewsModal;