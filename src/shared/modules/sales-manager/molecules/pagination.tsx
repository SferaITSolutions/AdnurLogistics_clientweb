import { useOrderDetailsStore } from '@/features/order-details/lib/store';
import React from 'react';
import { Pagination as PaginationAntd } from 'antd';

interface PaginationProps {
  dataLength: number; // umuman data uzunligi (total)
}

const Pagination: React.FC<PaginationProps> = ({ dataLength }) => {
  const { page, setPage, size, setSize } = useOrderDetailsStore();

  return (
    <div className="flex gap-4 justify-center my-6">
      <PaginationAntd
        current={page + 1}
        total={dataLength}
        pageSize={size}
        showSizeChanger={false}
        onChange={(pageNumber: number) => {
          setPage(pageNumber - 1);
        }}
      />
    </div>
  );
};

export default Pagination;
