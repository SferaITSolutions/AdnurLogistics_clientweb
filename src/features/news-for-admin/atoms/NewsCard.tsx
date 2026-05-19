// 'use client'
// import React from 'react'

interface NewsCardProps {
    imgUrl?: string
    title?: string
    onClick: () => void
}

export default function NewsCard({ imgUrl, title, onClick }: NewsCardProps) {
    return (
        <div
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
            onClick={onClick}
        >
            <div className="relative overflow-hidden">
                <div className="relative w-full aspect-[5/4]">
                    <img
                        src={imgUrl || "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"}
                        alt={title || "News thumbnail"}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
            </div>
        </div>
    )
}