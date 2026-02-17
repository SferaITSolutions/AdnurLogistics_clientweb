// components/atoms/NewsImage.tsx

const FALLBACK_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";

interface NewsImageProps {
  src: string;
  alt: string;
  className?: string;
}

const NewsImage = ({ src, alt, className = "" }: NewsImageProps) => {
  return (
    <img
      src={src || FALLBACK_IMAGE}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
      }}
    />
  );
};

export default NewsImage;