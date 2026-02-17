// components/molecules/ModalFooter.tsx

import ActionButton from "../atoms/ActionButton";


// --- Create Modal Footer ---
interface CreateModalFooterProps {
  onCancel: () => void;
  onDraft: () => void;
  onPublish: () => void;
  isLoading: boolean;
}

export const CreateModalFooter = ({
  onCancel,
  onDraft,
  onPublish,
  isLoading,
}: CreateModalFooterProps) => (
  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
    <ActionButton onClick={onCancel} disabled={isLoading} variant="secondary">
      Bekor qilish
    </ActionButton>
    <ActionButton
      onClick={onDraft}
      loading={isLoading}
      variant="secondary"
    >
      Qoralama
    </ActionButton>
    <ActionButton
      onClick={onPublish}
      loading={isLoading}
      variant="success"
    >
      E'lon qilish
    </ActionButton>
  </div>
);

// --- Edit Modal Footer ---
interface EditModalFooterProps {
  onCancel: () => void;
  onSave: () => void;
  isLoading: boolean;
}

export const EditModalFooter = ({
  onCancel,
  onSave,
  isLoading,
}: EditModalFooterProps) => (
  <div className="flex justify-end gap-3 pt-4">
    <ActionButton onClick={onCancel} disabled={isLoading} variant="secondary">
      Bekor qilish
    </ActionButton>
    <ActionButton onClick={onSave} loading={isLoading} variant="primary">
      Saqlash
    </ActionButton>
  </div>
);

// --- Status Modal Footer ---
interface StatusModalFooterProps {
  onCancel: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const StatusModalFooter = ({
  onCancel,
  onConfirm,
  isLoading,
}: StatusModalFooterProps) => (
  <div className="flex justify-end gap-3 pt-4">
    <ActionButton onClick={onCancel} disabled={isLoading} variant="secondary">
      Bekor qilish
    </ActionButton>
    <ActionButton onClick={onConfirm} loading={isLoading} variant="success">
      E'lon qilish
    </ActionButton>
  </div>
);  