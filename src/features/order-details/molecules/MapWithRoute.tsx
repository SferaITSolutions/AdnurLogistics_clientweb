"use client";
import React, { useEffect, useRef, useState } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";

interface Props {
  height?: number | string;
  origin?: string;
  destination?: string;
  speedKmH?: number; // Mashina tezligi (km/h)
}

const DEFAULT_ORIGIN = "Yiwu, Zhejiang, China";
const DEFAULT_DESTINATION = "Tashkent, Uzbekistan";

const YandexMapWithTruck: React.FC<Props> = ({
  height = 400,
  origin,
  destination,
  speedKmH = 50, // km/h
}) => {
  const mapRef = useRef<any>(null);
  const ymapsRef = useRef<any>(null);
  const carRef = useRef<any>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [etaDate, setEtaDate] = useState<string>("");

  const referencePoints = [
    origin?.trim() ? origin : DEFAULT_ORIGIN,
    destination?.trim() ? destination : DEFAULT_DESTINATION,
  ];

  // --- Yo‘lni yaratish ---
  const createRoute = async () => {
    const ymaps = ymapsRef.current;
    const map = mapRef.current;
    if (!ymaps || !map) return;

    const multiRoute = new ymaps.multiRouter.MultiRoute(
      { referencePoints },
      {
        boundsAutoApply: true,
        wayPointVisible: true,
        routeActiveStrokeWidth: 5,
        routeActiveStrokeColor: "#1976d2",
      }
    );

    map.geoObjects.removeAll();
    map.geoObjects.add(multiRoute);

    multiRoute.model.events.add("requestsuccess", () => {
      const activeRoute = multiRoute.getActiveRoute();
      if (!activeRoute) return;

      const distance = activeRoute.properties.get("distance").value; // metrda
      const distanceKm = distance / 1000;
      setDistanceKm(distanceKm);

      // Taxminiy vaqt hisoblash (soat)
      const hours = distanceKm / speedKmH;
      const etaMs = Date.now() + hours * 3600 * 1000;
      const eta = new Date(etaMs);
      setEtaDate(
        eta.toLocaleString("uz-UZ", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      const path = activeRoute.getPaths().get(0);
      const coords = path.geometry.getCoordinates().flat();

      if (coords.length > 0) {
        addMovingTruck(coords, distanceKm);
      }
    });
  };

  // --- Yuk mashinasini harakatlantirish ---
  const addMovingTruck = (coords: number[][], distanceKm: number) => {
    const ymaps = ymapsRef.current;
    const map = mapRef.current;
    if (!ymaps || !map) return;

    // Avvalgi mashinani o‘chirish
    if (carRef.current) {
      map.geoObjects.remove(carRef.current);
    }

    // Yuk mashina belgisi
    const truck = new ymaps.Placemark(
      coords[0],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "https://picsum.photos/500", // yuk mashina ikonkasi
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -20],
      }
    );

    carRef.current = truck;
    map.geoObjects.add(truck);

    let index = 0;
    const total = coords.length;
    const totalTimeSec = (distanceKm / speedKmH) * 3600; // harakat davomiyligi sekundda
    const intervalMs = 1000; // har soniyada
    const step = Math.floor(total / totalTimeSec);

    const timer = setInterval(() => {
      if (index >= total - 1) {
        clearInterval(timer);
        return;
      }
      index += step;
      truck.geometry.setCoordinates(coords[index]);
    }, intervalMs);
  };

  useEffect(() => {
    return () => {
      if (mapRef.current) mapRef.current.geoObjects.removeAll();
    };
  }, []);

  return (
    <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm">
      <YMaps
        query={{
          load: "package.full",
          lang: "en_RU",
          apikey: process.env.NEXT_PUBLIC_YANDEX_API_KEY,
        }}
      >
        <Map
          defaultState={{ center: [40.7831, 65.9667], zoom: 5 }}
          width="100%"
          height={height}
          modules={["multiRouter.MultiRoute", "control.ZoomControl"]}
          instanceRef={(ref) => {
            mapRef.current = ref;
            if (ymapsRef.current) {
              createRoute();
            }
          }}
          onLoad={(ymaps: any) => {
            ymapsRef.current = ymaps;
            if (mapRef.current) {
              createRoute();
            }
          }}
        />
      </YMaps>

      {distanceKm && (
        <div className="p-3 text-center text-sm text-gray-700 bg-gray-50 border-t">
          🚚 Masofa: <b>{distanceKm.toFixed(1)} km</b> <br />
          ⏱️ Tezlik: <b>{speedKmH} km/h</b> <br />
          📅 Yetib kelish vaqti: <b>{etaDate}</b>
        </div>
      )}
    </div>
  );
};

export default YandexMapWithTruck;
