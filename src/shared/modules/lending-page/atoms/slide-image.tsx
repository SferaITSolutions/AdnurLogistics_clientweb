"use client";

import Image from "next/image";

interface SlideImageProps {
  src: string;
  alt: string;
}

export const SlideImage = ({ src, alt }: SlideImageProps) => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={src}
        alt={alt}
        height={150}
        className="object-contain transition-transform duration-300 hover:scale-110"
      />
    </div>
  );
};
