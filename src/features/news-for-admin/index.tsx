'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useNewsListForAdmin, useNewsOneForAdmin } from '@/entities/hooks/news-hooks/hooks';

// Swiper CSS
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
    if (!open) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
            <div className="bg-white rounded-xl max-w-4xl w-full p-6 relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button
                    className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-800 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                    onClick={onClose}
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    )
}

export default function NewsForAdmin() {
    const { data: newsList, isPending } = useNewsListForAdmin();
    const newsData = newsList?.result || [];
    const [selectedId, setSelectedId] = useState<string | null | any>(null);

    // get one news by id
    const { data: selectedNews, isPending: loadingNewsDetails } = useNewsOneForAdmin(selectedId);
    
    const handleCardClick = (uid: string) => {
        setSelectedId(uid);
    };

    const handleCloseModal = () => {
        setSelectedId(null);
    };

    return (
        <div className="p-4">
            {/* News Slider - 3 cards at a time */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6">Yangiliklar</h2>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={newsData.length > 3}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                    }}
                    className="news-swiper"
                >
                    {newsData.map((item: any) => (
                        <SwiperSlide key={item.uid}>
                            <div
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
                                onClick={() => handleCardClick(item.id)}
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={
                                            item.imgUrl ||
                                            "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                                        }
                                        alt={item.title || "News thumbnail"}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* All News Grid (optional - ixtiyoriy) */}
            {/* <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Barcha yangiliklar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsData.map((item: any) => (
                        <div
                            key={item.uid}
                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
                            onClick={() => handleCardClick(item.uid)}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={
                                        item.imgUrl ||
                                        "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                                    }
                                    alt={item.title || "News thumbnail"}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-3 flex-1">
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Modal with Image Slider */}
            <Modal open={!!selectedId} onClose={handleCloseModal}>
                {loadingNewsDetails ? (
                    <div className="p-6 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <p className="mt-2">Yuklanmoqda...</p>
                    </div>
                ) : selectedNews?.result ? (
                    <div>
                        {/* Image Slider in Modal */}
                        <div className="rounded-lg overflow-hidden mb-4">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={10}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                className="h-[300px] md:h-[400px] modal-swiper"
                            >
                                <SwiperSlide>
                                    <img
                                        src={
                                            selectedNews.result.imgUrl ||
                                            "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                                        }
                                        alt={selectedNews.result.title}
                                        className="w-full h-full object-cover"
                                    />
                                </SwiperSlide>
                                {/* Agar qo'shimcha rasmlar bo'lsa */}
                                {selectedNews.result.additionalImages?.map((img: string, idx: number) => (
                                    <SwiperSlide key={idx}>
                                        <img
                                            src={img}
                                            alt={`${selectedNews.result.title} - ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold mb-4">{selectedNews.result.title}</h3>
                        <p className="mb-4 text-gray-700 leading-relaxed whitespace-pre-line">{selectedNews.result.content}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="text-gray-500 text-sm">
                                {selectedNews.result.createdAt &&
                                    new Date(selectedNews.result.createdAt).toLocaleDateString("uz-UZ", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Yopish
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500">Ma'lumot topilmadi</div>
                )}
            </Modal>

            <style jsx global>{`
                .news-swiper .swiper-button-next,
                .news-swiper .swiper-button-prev {
                    color: #2563eb;
                    background: white;
                    padding: 20px;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                }
                
                .news-swiper .swiper-button-next:after,
                .news-swiper .swiper-button-prev:after {
                    font-size: 18px;
                    font-weight: bold;
                }

                .news-swiper .swiper-button-next:hover,
                .news-swiper .swiper-button-prev:hover {
                    background: #2563eb;
                    color: white;
                }
                
                .news-swiper .swiper-pagination-bullet {
                    background: #cbd5e1;
                    opacity: 1;
                    width: 10px;
                    height: 10px;
                }
                
                .news-swiper .swiper-pagination-bullet-active {
                    background: #2563eb;
                    width: 24px;
                    border-radius: 5px;
                }

                .modal-swiper .swiper-button-next,
                .modal-swiper .swiper-button-prev {
                    color: white;
                    background: rgba(0, 0, 0, 0.5);
                    padding: 20px;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                }
                
                .modal-swiper .swiper-button-next:after,
                .modal-swiper .swiper-button-prev:after {
                    font-size: 20px;
                }
                
                .modal-swiper .swiper-pagination-bullet {
                    background: white;
                    opacity: 0.7;
                }
                
                .modal-swiper .swiper-pagination-bullet-active {
                    background: white;
                    opacity: 1;
                }

                .swiper-slide {
                    height: auto;
                }
            `}</style>
        </div>
    )
}