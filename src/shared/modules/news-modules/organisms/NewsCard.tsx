// components/organisms/NewsCard.tsx

import NewsCardMeta from "../molecules/NewsCardMeta";
import NewsCardActions from "../molecules/NewsCardActions";
import NewsImage from "../atoms/NewsImage";
import StatusBadge from "../atoms/StatusBadge";


export interface NewsItem {
  id: string;
  title: string;
  content: string;
  imgUrl: string;
  status: "PUBLIC" | "DRAFT";
  createdAt: string;
}

interface NewsCardProps {
  item: NewsItem;
  onView: (item: NewsItem) => void;
  onEdit: (item: NewsItem) => void;
  onPublish: (item: NewsItem) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  isPublishing: boolean;
  publishingId: string | null;
}

const NewsCard = ({
  item,
  onView,
  onEdit,
  onPublish,
  onDelete,
  isDeleting,
  isPublishing,
  publishingId,
}: NewsCardProps) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      {/* Image Section */}
      <div
        onClick={() => onView(item)}
        className="cursor-pointer relative overflow-hidden"
      >
        <NewsImage
          src={item.imgUrl}
          alt={item.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <StatusBadge status={item.status} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <div
          onClick={() => onView(item)}
          className="cursor-pointer mb-4"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {item.content}
          </p>
        </div>

        <div className="flex-1" />

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <NewsCardMeta
              status={item.status}
              createdAt={item.createdAt}
              onPublish={() => onPublish(item)}
              isPublishing={isPublishing && publishingId === item.id}
            />
          </div>

          <NewsCardActions
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item.id)}
            isDeleting={isDeleting}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsCard;