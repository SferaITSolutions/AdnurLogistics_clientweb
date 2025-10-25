import { Input, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';

import { useUpdateMe } from '@/widgets/headers/navbar-cabinet/hook/hook';

interface Props {
  userName: string;
  userPhone: string;
}

const EditablePopconfirm: React.FC<Props> = ({ userName, userPhone }) => {
  const updateData = useUpdateMe();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(userName);

  useEffect(() => {
    if (open) setInputValue(userName);
  }, [open]);

  const handleConfirm = async () => {
    await updateData.mutateAsync(inputValue);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setInputValue(userName);
  };

  return (
    <Popconfirm
      icon={null}
      placement="bottom"
      title="Profilni tahrirlash"
      description={
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Ismni kiriting"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <p className="text-xs text-gray-400">Ismingizni o‘zgartirib saqlang</p>
        </div>
      }
      okText="Saqlash"
      cancelText="Bekor qilish"
      open={open}
      onOpenChange={setOpen}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      okButtonProps={{ loading: updateData.isPending }}
    >
      <div className="cursor-pointer">
        <h1 className="text-md font-semibold !mb-0">{userName}</h1>
        <p className="text-sm !mb-0 text-gray-500">{userPhone}</p>
      </div>
    </Popconfirm>
  );
};

export default EditablePopconfirm;
