import React from "react";

export const VideoModal = () => {
  return (
    <div className="w-full max-w-4xl p-5">
      <div className="relative aspect-video w-full h-full">
        <iframe
          className="w-full h-full rounded-xl"
          src="https://www.youtube.com/embed/PfEczXuk6R8?autoplay=1&mute=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
};
