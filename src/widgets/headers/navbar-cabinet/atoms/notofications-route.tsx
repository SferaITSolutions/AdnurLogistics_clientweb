import { useRouter } from "next/navigation";
import React from "react";
import { MdNotifications } from "react-icons/md";

export default function NotificationsRoute() {
  const router = useRouter();
  return (
    <button onClick={() => router.push("/client/notifications")} className="rounded-full p-2 bg-secondary-blue-color">
      <MdNotifications className=" text-[#fff] " size={25}/>
    </button>
  );
}
