"use client";
import React, { useEffect, useRef } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";

interface Props {
  origin: string;
  destination: string;
  height?: number | string;
}

const YandexMapWithMovingCar: React.FC<Props> = ({
  origin,
  destination,
  height = 400,
}) => {
  const mapRef = useRef<any>(null);
  const ymapsRef = useRef<any>(null);
  const carRef = useRef<any>(null);
  const animationRef = useRef<number | null>(null);
  const coordsRef = useRef<number[][]>([]);

  const interpolate = (c1: number[], c2: number[], t: number) => {
    return [c1[0] + (c2[0] - c1[0]) * t, c1[1] + (c2[1] - c1[1]) * t];
  };

  const startAnimation = () => {
    const coords = coordsRef.current;
    if (!coords.length || !carRef.current) return;

    let segIndex = 0;
    let frac = 0;
    const step = () => {
      if (!carRef.current) return;

      const from = coords[segIndex];
      const to = coords[segIndex + 1] || coords[0];
      frac += 0.02;
      if (frac > 1) {
        frac = 0;
        segIndex++;
        if (segIndex >= coords.length - 1) {
          segIndex = 0; // loop
        }
      }

      const pos = interpolate(from, to, frac);
      carRef.current.geometry.setCoordinates(pos);

      animationRef.current = requestAnimationFrame(step);
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(step);
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const createRouteAndCar = async () => {
    const ymaps = ymapsRef.current;
    const map = mapRef.current;
    if (!ymaps || !map) return;

    try {
      const multiRoute = new ymaps.multiRouter.MultiRoute(
        {
          referencePoints: [origin, destination],
          params: { routingMode: "auto" },
        },
        {
          boundsAutoApply: true,
          routeActiveStrokeWidth: 5,
          routeActiveStrokeColor: "#1976d2",
        }
      );

      map.geoObjects.removeAll();
      map.geoObjects.add(multiRoute);

      multiRoute.model.events.add("requestsuccess", () => {
        const activeRoute = multiRoute.getActiveRoute();
        if (!activeRoute) return;
        const paths = activeRoute.getPaths().toArray();
        let routeCoords: number[][] = [];
        paths.forEach((p: any) => {
          const segments = p.getSegments();
          segments.forEach((s: any) => {
            const segCoords = s.geometry.getCoordinates();
            routeCoords = routeCoords.concat(segCoords);
          });
        });

        if (!routeCoords.length) {
          console.warn("No route coordinates found");
          return;
        }

        coordsRef.current = routeCoords;

        if (carRef.current) {
          try {
            map.geoObjects.remove(carRef.current);
          } catch {}
          carRef.current = null;
        }

        const start = routeCoords[0];
        const carPlacemark = new ymaps.Placemark(
          start,
          {},
          {
            iconLayout: "default#image",
            iconImageHref:
              "https://cdn-icons-png.flaticon.com/512/61/61112.png",
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -20],
          }
        );

        carRef.current = carPlacemark;
        map.geoObjects.add(carPlacemark);

        try {
          map.setBounds(activeRoute.getBounds(), { checkZoomRange: true });
        } catch {}

        stopAnimation();
        startAnimation();
      });

      setTimeout(() => {
        try {
          multiRoute.model.events.fire("requestsuccess");
        } catch {}
      }, 500);
    } catch (err) {
      console.error("createRouteAndCar error:", err);
    }
  };

  useEffect(() => {
    return () => {
      stopAnimation();
      try {
        if (mapRef.current && carRef.current) {
          mapRef.current.geoObjects.remove(carRef.current);
        }
      } catch {}
    };
  }, []);

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200">
      <YMaps
        query={{
          load: "package.full",
          lang: "en_RU",
          apikey: process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY,
        }}
      >
        <Map
          instanceRef={(ref) => {
            mapRef.current = ref;
            if (ymapsRef.current) {
              setTimeout(() => {
                createRouteAndCar();
              }, 300);
            }
          }}
          onLoad={(ymaps: any) => {
            ymapsRef.current = ymaps;
            if (mapRef.current) {
              createRouteAndCar();
            }
          }}
          defaultState={{
            center: [41.2995, 69.2401],
            zoom: 6,
          }}
          width="100%"
          height={height}
          modules={["multiRouter.MultiRoute", "control.ZoomControl"]}
        />
      </YMaps>
    </div>
  );
};

export default YandexMapWithMovingCar;
