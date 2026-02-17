// components/atoms/ModalTitle.tsx

import React from "react";

interface ModalTitleProps {
  icon: React.ReactNode;
  title: string;
}

/**
 * Modal sarlavhasi: chap tomonda icon, yonida matn.
 */
const ModalTitle = ({ icon, title }: ModalTitleProps) => {
  return (
    <div className="text-xl font-bold flex items-center gap-3">
      {icon}
      {title}
    </div>
  );
};

export default ModalTitle;