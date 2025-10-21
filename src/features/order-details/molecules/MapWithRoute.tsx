"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { YMaps, Map } from "@pbe/react-yandex-maps";

interface MapWithRouteProps {
  origin: string;
  destination: string;
}

const MapWithRoute: React.FC<MapWithRouteProps> = ({ origin, destination }) => {
  const mapRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isReady || !window.ymaps || !mapRef.current) return;

    const { ymaps } = window as any;

    ymaps.ready(() => {
      mapRef.current.geoObjects.removeAll();

      const route = new ymaps.multiRouter.MultiRoute(
        {
          referencePoints: [origin, destination],
          params: { routingMode: "auto" },
        },
        {
          boundsAutoApply: true,
          routeActiveStrokeWidth: 5,
          routeActiveStrokeColor: "#007BFF",
          wayPointStartIconColor: "#1E90FF",
          wayPointFinishIconColor: "#FF4500",
        }
      );

      mapRef.current.geoObjects.add(route);
    });
  }, [isReady, origin, destination]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200">
      <YMaps
        query={{
          lang: "en_US",
          load: "package.full", // muhim! multiRoute yuklanadi
        }}
      >
        <Map
          defaultState={{
            center: [41.2995, 69.2401],
            zoom: 6,
            controls: ["zoomControl", "fullscreenControl"],
          }}
          modules={["multiRouter.MultiRoute", "control.ZoomControl"]}
          instanceRef={mapRef}
          width="100%"
          height="400px"
          onLoad={() => setIsReady(true)}
        />
      </YMaps>
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-gray-500 text-sm">
          Loading map...
        </div>
      )}
    </div>
  );
};

// SSR xatolarni oldini olish uchun dynamic export
export default dynamic(() => Promise.resolve(MapWithRoute), { ssr: false });
