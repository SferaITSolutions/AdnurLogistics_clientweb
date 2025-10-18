"use client";

import Image from "next/image";

interface SlideImageProps {
  src: string;
  alt: string;
}

export const SlideImage = ({ src, alt }: SlideImageProps) => {
  return (
    <div className="relative   flex items-center justify-center">
      <Image
        src={src}
        alt={alt}
        width={300}
        className="object-contain transition-transform duration-300 hover:scale-110"
      />
    </div>
  );
};
