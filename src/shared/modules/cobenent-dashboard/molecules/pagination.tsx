import { useOrderDetailsStore } from '@/features/order-details/lib/store';
import React from 'react';
import { Pagination as PaginationAntd } from 'antd';

interface PaginationProps {
  dataLength: number; // hozirgi page uchun data uzunligi, oldinga yurish buttonni disable uchun kerak
}

const Pagination: React.FC<PaginationProps> = ({ dataLength }) => {
  const { page, setPage, size, setSize } = useOrderDetailsStore();

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (dataLength > 0) setPage(page + 1);
  };

  return (
    <div className="flex gap-4 justify-center my-6">
      <PaginationAntd total={dataLength} pageSize={size} onChange={(page: number, size: number) => {
        setPage(page);
        setSize(size);
      }} />

    </div>
  );
};

export default Pagination;
