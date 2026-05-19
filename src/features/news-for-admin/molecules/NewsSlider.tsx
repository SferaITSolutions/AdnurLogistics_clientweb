'use client'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { useNewsListForAdmin } from '@/entities/hooks/news-hooks/hooks'
import 'swiper/css'
import 'swiper/css/pagination'
import NewsCard from '../atoms/NewsCard'
import NewsModal from './NewsModal'

export default function NewsSlider() {
    const { data: newsList } = useNewsListForAdmin()
    const newsData = newsList?.result || []
    const [selectedId, setSelectedId] = useState<string | number | null>(null)

    return (
        <>
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={newsData.length > 3}
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
                className="news-swiper"
            >
                {newsData.map((item: any) => (
                    <SwiperSlide key={item.uid}>
                        <NewsCard
                            imgUrl={item.imgUrl}
                            title={item.title}
                            onClick={() => setSelectedId(item.id)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <NewsModal
                selectedId={selectedId}
                onClose={() => setSelectedId(null)}
            />
        </>
    )
}