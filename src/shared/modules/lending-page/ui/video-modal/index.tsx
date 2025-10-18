import React from "react";

export const VideoModal = () => {
  return (
    <div>
      <div className="w-full max-w-4xl p-5">
        <div className="relative aspect-video w-full h-full">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
