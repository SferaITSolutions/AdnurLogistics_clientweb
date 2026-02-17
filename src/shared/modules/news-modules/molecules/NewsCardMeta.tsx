// components/molecules/NewsCardMeta.tsx

import { Button } from "antd";
import { FaEdit } from "react-icons/fa";

interface NewsCardMetaProps {
  status: "PUBLIC" | "DRAFT";
  createdAt: string;
  onPublish: () => void;
  isPublishing: boolean;
}

const NewsCardMeta = ({
  status,
  createdAt,
  onPublish,
  isPublishing,
}: NewsCardMetaProps) => {
  if (status === "PUBLIC") {
    return (
      <div className="text-sm text-gray-500">
        {new Date(createdAt).toLocaleDateString("uz-UZ", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    );
  }

  return (
    <Button
      type="text"
      icon={<FaEdit />}
      onClick={onPublish}
      disabled={isPublishing}
      className="!text-amber-600 !p-4 py-6 hover:text-amber-700 !font-medium !transition-colors disabled:opacity-50"
    >
      {isPublishing ? "Yuklanmoqda..." : "E'lon qilish"}
    </Button>
  );
};

export default NewsCardMeta;