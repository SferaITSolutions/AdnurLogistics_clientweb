import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { useOrderDetailsStore } from '@/features/order-details/lib/store';
import React from 'react';

interface PaginationProps {
  dataLength: number; // hozirgi page uchun data uzunligi, oldinga yurish buttonni disable uchun kerak
}

const Pagination: React.FC<PaginationProps> = ({ dataLength }) => {
  const { page, setPage } = useOrderDetailsStore();

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (dataLength > 0) setPage(page + 1);
  };

  return (
    <div className="flex gap-4 justify-center my-6">
      <button
        onClick={handlePrev}
        disabled={page === 0}
        className={`px-4 py-2 rounded bg-blue-500 text-white transition disabled:bg-gray-300`}
      >
        <FaArrowLeft className="text-white" />
      </button>
      <span className="flex items-center px-3 text-gray-700 font-medium">{page + 1}</span>
      <button
        onClick={handleNext}
        disabled={dataLength === 0}
        className={`px-4 py-2 rounded bg-blue-500 text-white transition disabled:bg-gray-300`}
      >
        <FaArrowRight className="text-white" />
      </button>
    </div>
  );
};

export default Pagination;
