"use client";
import React from "react";
import Sidebar from "@/widgets/sidebar";
import Navbar from "@/widgets/headers/navbar-cabinet";

const ClientPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Navbar />
      <div className="container md:!ml-[300px] !mt-[90px] justify-center ali">{children}</div>
    </div>
  );
};

export default ClientPage;
