import React from "react";

export default function StatusOrder({ status }: { status: string }) {
  return (
    <div className="bg-green-600 w-[40px] rounded-l-none text-white font-semibold  py-12 flex items-center justify-center text-sm h-full rounded-r-xl">
      <h1 className="-rotate-90 text-md w-fit">{status}</h1>
    </div>
  );
}
