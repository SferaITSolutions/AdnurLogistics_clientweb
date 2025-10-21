import React, { useState } from "react";

export default function UserDetails({
  userName,
  userPhone,
  onClick,
}: {
  userName: string;
  userPhone: string;
  onClick?: () => void;
}) {

  return (
    <div
    className="flex flex-col cursor-pointer"
    onClick={onClick}
    >
      <h1 className="text-lg font-semibold">{userName}</h1>
      <p className="text-sm">{userPhone}</p>
    </div>
  );
}
