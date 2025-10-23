"use client";

import { SlideImage } from "../atoms/slide-image";

interface PartnerSlideProps {
  logo: string;
  name: string;
}

export const PartnerSlide = ({ logo, name }: PartnerSlideProps) => {
  return (
    <div className="flex items-center justify-center gap-5 duration-300 hover:scale-105 p-4">
      <SlideImage src={logo} alt={name} />
    </div>
  );
};
