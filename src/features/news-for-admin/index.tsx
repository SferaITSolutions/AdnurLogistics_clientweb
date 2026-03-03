'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useNewsListForAdmin, useNewsOneForAdmin } from '@/entities/hooks/news-hooks/hooks';

// Swiper CSS
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Image, Modal as AntdModal, Button } from 'antd';
import { useTranslations } from 'next-intl';

export default function NewsForAdmin() {
    const t = useTranslations('calculationPage');
    const tr = useTranslations('translation');
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
                {/* <h2 className="text-3xl font-bold mb-6">Yangiliklar</h2> */}
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
                                    <div className="relative w-full aspect-[5/4]">
                                        <img
                                            src={
                                                item.imgUrl ||
                                                "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                                            }
                                            alt={item.title || "News thumbnail"}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
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

            <AntdModal
                open={!!selectedId}
                onCancel={handleCloseModal}
                footer={null}
                title={null}
                centered
                width={1000}
                bodyStyle={{
                    padding: 0,
                    borderRadius: '16px',
                    overflow: 'hidden',
                }}
                destroyOnClose
            >
                {loadingNewsDetails ? (
                    <div className="p-6 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <p className="mt-2">Yuklanmoqda...</p>
                    </div>
                ) : selectedNews?.result ? (
                    <div className="p-6">
                        {/* Single Image(s) in Modal, no Swiper */}
                        <div className="rounded-lg overflow-hidden mb-4 flex flex-wrap gap-4 flex justify-center items-center">
                            <div className="aspect-[5/4] max-w-[60%] overflow-hidden rounded-lg">
                                <Image
                                    src={
                                        selectedNews.result.imgUrl ||
                                        "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                                    }
                                    alt={selectedNews.result.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* If there are additional images, render them below the main image */}
                            {selectedNews.result.additionalImages?.length > 0 && (
                                <div className="flex gap-4 flex-wrap mt-4 w-full">
                                    {selectedNews.result.additionalImages.map((img: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className="overflow-hidden rounded-md aspect-[5/4] min-w-[120px] max-w-[200px] flex-1"
                                            style={{ maxHeight: 160 }}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${selectedNews.result.title} - ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
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
                            <Button
                                onClick={handleCloseModal}
                                type="primary"
                                className="px-4 py-2 rounded-lg"
                                style={{ background: '#2563eb', borderColor: '#2563eb' }}
                            >
                                {t('successModalCloseButton')}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500">{tr('noData')}</div>
                )}
            </AntdModal>

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