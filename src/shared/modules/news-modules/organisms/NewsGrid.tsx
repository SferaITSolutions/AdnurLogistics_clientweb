// components/organisms/NewsGrid.tsx

import { Empty, Spin } from "antd";
import NewsCard, { NewsItem } from "./NewsCard";

interface NewsGridProps {
  newsData: NewsItem[];
  isLoading: boolean;
  onView: (item: NewsItem) => void;
  onEdit: (item: NewsItem) => void;
  onPublish: (item: NewsItem) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  isPublishing: boolean;
  publishingId: string | null;
}

const NewsGrid = ({
  newsData,
  isLoading,
  onView,
  onEdit,
  onPublish,
  onDelete,
  isDeleting,
  isPublishing,
  publishingId,
}: NewsGridProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Spin size="large" />
        <p className="mt-4 text-gray-600 font-medium">Yuklanmoqda...</p>
      </div>
    );
  }

  if (newsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm">
        <Empty
          description={
            <span className="text-gray-600 font-medium">
              Hozircha yangiliklar yo'q
            </span>
          }
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsData.map((item) => (
        <NewsCard 
          key={item.id}
          item={item} 
          onView={onView} 
          onEdit={onEdit}
          onPublish={onPublish}
          onDelete={onDelete}
          isDeleting={isDeleting}
          isPublishing={isPublishing}
          publishingId={publishingId}
        />
      ))}
    </div>
  );
};

export default NewsGrid;