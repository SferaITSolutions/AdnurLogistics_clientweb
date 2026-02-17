// app/news/page.tsx
"use client";

import React, { useState } from "react";
import { Button, Empty, Input, Modal, Popconfirm, Spin, message } from "antd";
import {
  useNewsList,
  useCreateNews,
  useUpdateNews,
  useUpdateNewsStatus,
  useDeleteNews,
} from "@/entities/hooks/news-hooks/hooks";
import ImageUploader from "@/shared/components/dump/ui/image-upload";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const NewsPage = () => {
  const [isAddNewsModalOpen, setIsAddNewsModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"view" | "edit" | "status">("view");
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [uploaderKey, setUploaderKey] = useState(0); // Image uploader'ni reset qilish uchun

  // Create form state
  const [createForm, setCreateForm] = useState({
    title: "",
    content: "",
    imgUrl: "",
  });

  // Edit form state
  const [editForm, setEditForm] = useState<{
    id: string;
    title: string;
    content: string;
    imgUrl: string;
    status: "PUBLIC" | "DRAFT";
  } | null>(null);

  // Hooks
  const { data: newsList, isPending: isNewsListLoading, refetch } = useNewsList();
  const { mutate: createNews, isPending: isCreating } = useCreateNews();
  const { mutate: updateNews, isPending: isUpdating } = useUpdateNews();
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateNewsStatus();
  const { mutate: deleteNews, isPending: isDeleting } = useDeleteNews();

  const newsData = newsList?.result?.content || [];

  // Handlers
  const handleCreateNews = (status: "PUBLIC" | "DRAFT") => {
    if (!createForm.title.trim() || !createForm.content.trim() || !createForm.imgUrl) {
      message.error("Barcha maydonlarni to'ldiring va rasm yuklang!");
      return;
    }

    createNews(
      {
        title: createForm.title,
        content: createForm.content,
        imgUrl: createForm.imgUrl,
        status: status,
      },
      {
        onSuccess: () => {
          message.success("Yangilik muvaffaqiyatli yaratildi!");
          setCreateForm({ title: "", content: "", imgUrl: "" });
          setUploaderKey(prev => prev + 1); // Image uploader'ni reset qilish
          setIsAddNewsModalOpen(false);
          refetch();
        },
        onError: () => {
          message.error("Yangilik yaratishda xatolik yuz berdi!");
        },
      }
    );
  };

  const handleUpdateNews = () => {
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
          setIsModalOpen(false);
          setEditForm(null);
          refetch();
        },
        onError: () => {
          message.error("Yangilikni yangilashda xatolik yuz berdi!");
        },
      }
    );
  };

  const handleStatusUpdate = () => {
    if (!selectedNewsId) return;

    updateStatus(
      {
        id: selectedNewsId,
        status: "PUBLIC",
      },
      {
        onSuccess: () => {
          message.success("Yangilik holati yangilandi!");
          setIsModalOpen(false);
          setSelectedNewsId(null);
          refetch();
        },
        onError: () => {
          message.error("Holatni yangilashda xatolik yuz berdi!");
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteNews(id, {
      onSuccess: () => {
        message.success("Yangilik muvaffaqiyatli o'chirildi!");
        refetch();
      },
      onError: () => {
        message.error("Yangilik o'chirishda xatolik yuz berdi!");
      },
    });
  };

  const openViewModal = (news: any) => {
    setEditForm({
      id: news.id,
      title: news.title,
      content: news.content,
      imgUrl: news.imgUrl,
      status: news.status,
    });
    setModalType("view");
    setIsModalOpen(true);
  };

  const openEditModal = (news: any) => {
    setEditForm({
      id: news.id,
      title: news.title,
      content: news.content,
      imgUrl: news.imgUrl,
      status: news.status,
    });
    setModalType("edit");
    setIsModalOpen(true);
  };

  const openStatusModal = (news: any) => {
    setSelectedNewsId(news.id);
    setModalType("status");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddNewsModalOpen(false);
    setCreateForm({ title: "", content: "", imgUrl: "" });
    setUploaderKey(prev => prev + 1); // Image uploader'ni reset qilish
  };

  return (
    <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl !font-bold text-gray-900 mb-2">
                Yangiliklar
              </h1>
              <p className="text-gray-600">
                Barcha yangiliklar va e'lonlarni boshqaring
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                type="primary"
                size="large"
                icon={<FaPlus />}
                onClick={() => setIsAddNewsModalOpen(true)}
              >
                Yangi yaratish
              </Button>
            </div>
          </div>
        </div>

        {/* News Grid */}
        {isNewsListLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Spin size="large" />
            <p className="mt-4 text-gray-600 font-medium">Yuklanmoqda...</p>
          </div>
        ) : newsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.map((item: any) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                {/* Image Section */}
                <div
                  onClick={() => openViewModal(item)}
                  className="cursor-pointer relative overflow-hidden"
                >
                  <img
                    src={
                      item.imgUrl ||
                      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                    }
                    alt={item.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    {item.status === "PUBLIC" ? (
                      <span className="px-3 py-1 bg-green-500 !text-white text-xs font-semibold rounded-full shadow-lg">
                        E'lon qilingan
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-amber-500 !text-white text-xs font-semibold rounded-full shadow-lg">
                        Qoralama
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  <div
                    onClick={() => openViewModal(item)}
                    className="cursor-pointer mb-4"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                  <div className="flex-1"></div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <div className="text-sm text-gray-500">
                        {item.status === "PUBLIC" ? (
                          new Date(item.createdAt).toLocaleDateString("uz-UZ", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        ) : (
                          <Button
                            type="text"
                            icon={<FaEdit />}
                            onClick={() => openStatusModal(item)}
                            disabled={isUpdatingStatus && selectedNewsId === item.id}
                            className="!text-amber-600 !p-4 py-6  hover:text-amber-700 !font-medium !transition-colors disabled:opacity-50"
                          >
                            {isUpdatingStatus && selectedNewsId === item.id
                              ? "Yuklanmoqda..."
                              : "E'lon qilish"}
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => openEditModal(item)}
                        className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                      >
                        <FaEdit/>
                      </button>
                      <Popconfirm
                        title="O'chirish"
                        description="Ushbu yangilikni o'chirishga ishonchingiz komilmi?"
                        okText="Ha"
                        cancelText="Yo'q"
                        okButtonProps={{ danger: true }}
                        onConfirm={() => handleDelete(item.id)}
                      >
                        <button
                          disabled={isDeleting && selectedNewsId === item.id}
                          className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium disabled:opacity-50"
                        >
                          {isDeleting && selectedNewsId === item.id ? (
                            <Spin size="small" />
                          ) : (
                            <MdDelete />
                          )}
                        </button>
                      </Popconfirm>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm">
            <Empty
              description={
                <span className="text-gray-600 font-medium">
                  Hozircha yangiliklar yo'q
                </span>
              }
            />
          </div>
        )}
      </div>

      {/* Add News Modal */}
      <Modal
        open={isAddNewsModalOpen}
        onCancel={handleModalClose}
        centered
        footer={
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleModalClose}
              disabled={isCreating}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Bekor qilish
            </button>
            <button
              onClick={() => handleCreateNews("DRAFT")}
              disabled={isCreating}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? <Spin size="small" /> : "Qoralama"}
            </button>
            <button
              onClick={() => handleCreateNews("PUBLIC")}
              disabled={isCreating}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 !text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? <Spin size="small" /> : "E'lon qilish"}
            </button>
          </div>
        }
        width={900}
        className="rounded-2xl overflow-hidden"
        title={
          <span className="text-2xl font-bold text-gray-900">
            Yangi yangilik yaratish
          </span>
        }
      >
        <div className="space-y-6 pt-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sarlavha
            </label>
            <Input
              size="large"
              placeholder="Yangilik sarlavhasini kiriting..."
              value={createForm.title}
              onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
              disabled={isCreating}
              className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tavsif
              </label>
              <textarea
                rows={12}
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                placeholder="Yangilik matnini kiriting..."
                value={createForm.content}
                onChange={(e) => setCreateForm({ ...createForm, content: e.target.value })}
                disabled={isCreating}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rasm
              </label>
              <ImageUploader
                key={uploaderKey} // Bu key o'zgarganda component to'liq reset bo'ladi
                onUploadSuccess={(url: any) => {
                  setCreateForm({ ...createForm, imgUrl: url });
                }}
                uploadPath="news"
                maxSizeMB={5}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* View/Edit/Status Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditForm(null);
          setSelectedNewsId(null);
        }}
        centered
        footer={
          modalType === "status" ? (
            <div className="flex justify-end gap-3 pt-4">
              <button
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                onClick={() => setIsModalOpen(false)}
                disabled={isUpdatingStatus}
              >
                Bekor qilish
              </button>
              <button
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 !text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-colors font-medium shadow-lg disabled:opacity-50"
                onClick={handleStatusUpdate}
                disabled={isUpdatingStatus}
              >
                {isUpdatingStatus ? <Spin size="small" /> : "E'lon qilish"}
              </button>
            </div>
          ) : modalType === "edit" ? (
            <div className="flex justify-end gap-3 pt-4">
              <button
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                onClick={() => setIsModalOpen(false)}
                disabled={isUpdating}
              >
                Bekor qilish
              </button>
              <button
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 !text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium shadow-lg disabled:opacity-50"
                onClick={handleUpdateNews}
                disabled={isUpdating}
              >
                {isUpdating ? <Spin size="small" /> : "Saqlash"}
              </button>
            </div>
          ) : null
        }
        width={900}
        className="rounded-2xl overflow-hidden"
      >
        {modalType === "status" ? (
          <div className="text-center py-6">
            <div className="mb-4 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">📢</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Yangilikni e'lon qilish
            </h2>
            <p className="text-gray-600">
              Ushbu yangilikni barcha foydalanuvchilarga ko'rsatish?
            </p>
          </div>
        ) : modalType === "view" && editForm ? (
          <div className="p-6">
            <img
              src={
                editForm.imgUrl ||
                "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
              }
              alt={editForm.title}
              className="w-full h-80 object-cover rounded-xl mb-6"
            />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {editForm.title}
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {editForm.content}
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Holati:</span>
              {editForm.status === "PUBLIC" ? (
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  E'lon qilingan
                </span>
              ) : (
                <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
                  Qoralama
                </span>
              )}
            </div>
          </div>
        ) : modalType === "edit" && editForm ? (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Yangilikni tahrirlash
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sarlavha
              </label>
              <Input
                size="large"
                placeholder="Yangilik sarlavhasini kiriting..."
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                disabled={isUpdating}
                className="rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kontent
              </label>
              <textarea
                rows={10}
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                placeholder="Yangilik matnini kiriting..."
                value={editForm.content}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                disabled={isUpdating}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rasm
              </label>
              <ImageUploader
                onUploadSuccess={(url) => {
                  setEditForm({ ...editForm, imgUrl: url });
                }}
                initialUrl={editForm.imgUrl}
                uploadPath="news"
                maxSizeMB={5}
              />
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default NewsPage;