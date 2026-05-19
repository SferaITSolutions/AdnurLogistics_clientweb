// 'use client'
import { Image } from 'antd'

interface NewsImageProps {
    src?: string
    alt?: string
    additionalImages?: string[]
}

export default function NewsImage({ src, alt, additionalImages }: NewsImageProps) {
    return (
        <div className="rounded-lg overflow-hidden mb-4 flex flex-wrap gap-4 justify-center items-center">
            <div className="aspect-[5/4] max-w-[60%] overflow-hidden rounded-lg">
                <Image
                    src={src || "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            </div>
            {additionalImages && additionalImages.length > 0 && (
                <div className="flex gap-4 flex-wrap mt-4 w-full">
                    {additionalImages.map((img, idx) => (
                        <div
                            key={idx}
                            className="overflow-hidden rounded-md aspect-[5/4] min-w-[120px] max-w-[200px] flex-1"
                            style={{ maxHeight: 160 }}
                        >
                            <Image
                                src={img}
                                alt={`${alt} - ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}