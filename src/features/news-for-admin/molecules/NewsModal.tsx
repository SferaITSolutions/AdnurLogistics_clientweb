'use client'
import { Modal as AntdModal, Button } from 'antd'
import { useTranslations } from 'next-intl'
import { useNewsOneForAdmin } from '@/entities/hooks/news-hooks/hooks'
import NewsImage from '../atoms/NewsImage'
import NewsDate from '../atoms/NewsDate'

interface NewsModalProps {
    selectedId: string | number | null
    onClose: () => void
}

export default function NewsModal({ selectedId, onClose }: NewsModalProps) {
    const t = useTranslations('calculationPage')
    const tr = useTranslations('translation')
    const { data: selectedNews, isPending: loading } = useNewsOneForAdmin(selectedId)

    return (
        <AntdModal
            open={!!selectedId}
            onCancel={onClose}
            footer={null}
            title={null}
            centered
            width={1000}
            bodyStyle={{ padding: 0, borderRadius: '16px', overflow: 'hidden' }}
            destroyOnClose
        >
            {loading ? (
                <div className="p-6 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                    <p className="mt-2">Yuklanmoqda...</p>
                </div>
            ) : selectedNews?.result ? (
                <div className="p-6">
                    <NewsImage
                        src={selectedNews.result.imgUrl}
                        alt={selectedNews.result.title}
                        additionalImages={selectedNews.result.additionalImages}
                    />
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{selectedNews.result.title}</h3>
                    <p className="mb-4 text-gray-700 leading-relaxed whitespace-pre-line">{selectedNews.result.content}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <NewsDate date={selectedNews.result.createdAt} />
                        <Button
                            onClick={onClose}
                            type="primary"
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
    )
}   