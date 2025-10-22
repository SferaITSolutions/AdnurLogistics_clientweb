import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

import { useUpdateMe } from '@/widgets/headers/navbar-cabinet/hook/hook';
import { useUpdateProfileModalStore } from '@/features/update-profile/lib/store';

const UpdateProfileModal: React.FC = () => {
  const updateData = useUpdateMe();
  const { isModalOpen, closeModal, fullname } = useUpdateProfileModalStore();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(fullname);
  }, [fullname]);

  const handleOk = async () => {
    await updateData.mutateAsync(inputValue);
    closeModal();
    setInputValue('');
  };

  const handleCancel = () => {
    closeModal();
    setInputValue('');
  };

  return (
    <Modal
      title="Tahrirlash"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Saqlash"
      cancelText="Bekor qilish"
      confirmLoading={updateData.isPending}
    >
      <Input
        placeholder="Ismni kiriting"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Modal>
  );
};

export default UpdateProfileModal;
