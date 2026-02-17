// app/news/page.tsx
"use client";

import { useState } from "react";
import { message } from "antd";
import {
  useNewsList,
  useCreateNews,
  useUpdateNews,
  useUpdateNewsStatus,
  useDeleteNews,
} from "@/entities/hooks/news-hooks/hooks";
import NewsPageHeader from "../organisms/NewsPageHeader";
import CreateNewsModal from "../organisms/CreateNewsModal";
import NewsDetailModal from "../organisms/NewsDetailModal";
import { NewsItem } from "../organisms/NewsCard";
import NewsGrid from "../organisms/NewsGrid";

type ModalType = "view" | "edit" | "status";

const NewsPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("view");
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<NewsItem | null>(null);

  // Hooks
  const { data: newsList, isPending: isNewsListLoading, refetch } = useNewsList();
  const { mutate: createNews, isPending: isCreating } = useCreateNews();
  const { mutate: updateNews, isPending: isUpdating } = useUpdateNews();
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateNewsStatus();
  const { mutate: deleteNews, isPending: isDeleting } = useDeleteNews();

  const newsData: NewsItem[] = newsList?.result?.content || [];

  // --- Handlers ---

  const handleCreate = (
    values: { title: string; content: string; imgUrl: string },
    status: "PUBLIC" | "DRAFT"
  ) => {
    if (!values.title.trim() || !values.content.trim() || !values.imgUrl) {
      message.error("Barcha maydonlarni to'ldiring va rasm yuklang!");
      return;
    }

    createNews(
      { ...values, status },
      {
        onSuccess: () => {
          message.success("Yangilik muvaffaqiyatli yaratildi!");
          setIsAddModalOpen(false);
          refetch();
        },
        onError: () => message.error("Yangilik yaratishda xatolik yuz berdi!"),
      }
    );
  };

  const handleUpdate = () => {
    if (!editForm) return;

    if (!editForm.title.trim() || !editForm.content.trim() || !editForm.imgUrl) {
      message.error("Barcha maydonlarni to'ldiring!");
      return;
    }

    updateNews(
      {
        id: editForm.id,
        title: editForm.title,
        content: editForm.content,
        imgUrl: editForm.imgUrl,
        status: editForm.status,
      },
      {
        onSuccess: () => {
          message.success("Yangilik muvaffaqiyatli yangilandi!");
          closeDetailModal();
          refetch();
        },
        onError: () => message.error("Yangilikni yangilashda xatolik yuz berdi!"),
      }
    );
  };

  const handleStatusUpdate = () => {
    if (!selectedNewsId) return;

    updateStatus(
      { id: selectedNewsId, status: "PUBLIC" },
      {
        onSuccess: () => {
          message.success("Yangilik holati yangilandi!");
          closeDetailModal();
          refetch();
        },
        onError: () => message.error("Holatni yangilashda xatolik yuz berdi!"),
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteNews(id, {
      onSuccess: () => {
        message.success("Yangilik muvaffaqiyatli o'chirildi!");
        refetch();
      },
      onError: () => message.error("Yangilik o'chirishda xatolik yuz berdi!"),
    });
  };

  // --- Modal openers ---

  const openViewModal = (item: NewsItem) => {
    setEditForm(item);
    setModalType("view");
    setIsDetailModalOpen(true);
  };

  const openEditModal = (item: NewsItem) => {
    setEditForm(item);
    setModalType("edit");
    setIsDetailModalOpen(true);
  };

  const openStatusModal = (item: NewsItem) => {
    setSelectedNewsId(item.id);
    setModalType("status");
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setEditForm(null);
    setSelectedNewsId(null);
  };

  return (
    <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <NewsPageHeader onAdd={() => setIsAddModalOpen(true)} />

        <NewsGrid
          newsData={newsData}
          isLoading={isNewsListLoading}
          onView={openViewModal}
          onEdit={openEditModal}
          onPublish={openStatusModal}
          onDelete={handleDelete}
          isDeleting={isDeleting}
          isPublishing={isUpdatingStatus}
          publishingId={selectedNewsId}
        />
      </div>

      <CreateNewsModal
        open={isAddModalOpen}
        isCreating={isCreating}
        onClose={() => setIsAddModalOpen(false)}
        onCreate={handleCreate}
      />

      <NewsDetailModal
        open={isDetailModalOpen}
        modalType={modalType}
        editForm={editForm}
        isUpdating={isUpdating}
        isUpdatingStatus={isUpdatingStatus}
        onClose={closeDetailModal}
        onEditChange={setEditForm}
        onSave={handleUpdate}
        onStatusConfirm={handleStatusUpdate}
      />
    </div>
  );
};

export default NewsPage;