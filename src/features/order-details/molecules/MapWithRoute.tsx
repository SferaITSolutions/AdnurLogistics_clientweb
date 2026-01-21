"use client";

import { Map, YMaps } from "@pbe/react-yandex-maps";
import React, { useEffect, useRef, useState } from "react";
import {
  FaRoute,
  FaCalendarAlt,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { Tag } from "antd";
import { useTranslations } from "next-intl";
import StatusBadge from "../atoms/status-colored";

interface Props {
  height?: number | string;
  origin?: string;
  destination?: string;
  speedKmH?: number;
  startDate?: any;
  endDate?: any;
  statusProps: any;
}

const locationMapping: Record<string, string> = {
  Horgos: "Horgos, Xinjiang, China",
  HORGOS: "Horgos, Xinjiang, China",
  Yiwu: "Yiwu, Zhejiang, China",
  YIWU: "Yiwu, Zhejiang, China",
  Factory: "Factory, China",
  FACTORY: "Factory, China",
  Foshan: "Foshan, Guangdong, China",
  FOSHAN: "Foshan, Guangdong, China",
  Tashkent: "Tashkent, Uzbekistan",
  TASHKENT: "Tashkent, Uzbekistan",
};

const normalizeLocation = (location: string): string => {
  if (!location) return "";
  const trimmed = location.trim();
  if (locationMapping[trimmed]) return locationMapping[trimmed];
  return trimmed;
};

const YandexMapWithTruck: React.FC<Props> = ({
  height = 400,
  origin = "Yiwu, China",
  destination = "Tashkent, Uzbekistan",
  speedKmH = 100,
  startDate,
  statusProps,
  endDate
}) => {
  const t = useTranslations("yandexMap");
  const formattedStart = startDate?.split("/")?.join("-");
  const formattedEnd = endDate?.split("/")?.join("-");
  let startEndDate = {
    start: formattedStart,
    end: formattedEnd,
  };

  const mapRef = useRef<any>(null);
  const ymapsRef = useRef<any>(null);
  const carRef = useRef<any>(null);
  const multiRouteRef = useRef<any>(null);
  const routeCoordsRef = useRef<number[][]>([]);
  const totalDistanceRef = useRef<number>(0);
  const updateIntervalRef = useRef<number | null>(null);

  const [remainingTime, setRemainingTime] = useState<string | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [remainingKm, setRemainingKm] = useState<number | null>(null);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [isMapReady, setIsMapReady] = useState(false);

  const normalizedOrigin = normalizeLocation(origin || "");
  const normalizedDestination = normalizeLocation(destination || "");

  const referencePoints = [
    normalizedOrigin || null,
    normalizedDestination || null,
  ].filter(Boolean);

  const calculateCurrentFraction = () => {
    const startDate = new Date(startEndDate.start?.replace(/\//g, "-") || "");
    const endDate = new Date(startEndDate.end?.replace(/\//g, "-") || "");
    const now = new Date();
    const totalMs = endDate.getTime() - startDate.getTime();
    const passedMs = now.getTime() - startDate.getTime();
    return Math.max(0, Math.min(1, passedMs / totalMs));
  };

  const getPositionAtFraction = (
    fraction: number,
    coords: number[][],
    ymaps: any
  ) => {
    const targetDistance = fraction * totalDistanceRef.current;
    let currentDistance = 0;
    let prevPoint = coords[0];
    let currentPosition = prevPoint;

    for (let i = 1; i < coords.length; i++) {
      const point = coords[i];
      const segmentDist = ymaps.coordSystem.geo.getDistance(prevPoint, point);
      if (currentDistance + segmentDist >= targetDistance) {
        const remaining = targetDistance - currentDistance;
        const ratio = remaining / segmentDist;
        const lat = prevPoint[0] + (point[0] - prevPoint[0]) * ratio;
        const lng = prevPoint[1] + (point[1] - prevPoint[1]) * ratio;
        currentPosition = [lat, lng];
        break;
      }
      currentDistance += segmentDist;
      prevPoint = point;
    }
    if (fraction >= 1) currentPosition = coords[coords.length - 1];
    return currentPosition;
  };

  const updateTruckPosition = () => {
    const ymaps = ymapsRef.current;
    const map = mapRef.current;
    const coords = routeCoordsRef.current;
    if (!ymaps || !map || coords.length === 0 || !multiRouteRef.current) return;

    const fraction = calculateCurrentFraction();
    setCurrentProgress(fraction);

    const totalKm = totalDistanceRef.current / 1000;
    const remaining = totalKm * (1 - fraction);
    setRemainingKm(remaining);

    // ✅ QOLGAN VAQTNI HISOBLASH
    const remainingHours = remaining / speedKmH; // qolgan soatlar
    const days = Math.floor(remainingHours / 24); // kunlar
    const hours = Math.floor(remainingHours % 24); // soatlar
    const minutes = Math.floor((remainingHours * 60) % 60); // daqiqalar

    // String formatga o'tkazish
    let timeStr = "";
    if (days > 0) timeStr += `${days}d `;
    if (hours > 0) timeStr += `${hours}h `;
    if (minutes > 0 || timeStr === "") timeStr += `${minutes}m`;
    setRemainingTime(timeStr.trim());

    if (!ymaps || !map || coords.length === 0 || !multiRouteRef.current) return;

    setCurrentProgress(fraction);
    setRemainingKm(remaining);

    const currentPosition = getPositionAtFraction(fraction, coords, ymaps);

    if (!carRef.current) {
      const marker = new ymaps.Placemark(
        currentPosition,
        {
          hintContent: t("onWay", { percent: (fraction * 100).toFixed(1) }),
          balloonContent: t("speed", { speed: speedKmH }),
          iconContent: t("truck"),
        },
        {
          iconLayout: "default#image",
          iconImageHref: "/truck.png",
          iconImageSize: [40, 40],
          iconImageOffset: [-20, -20],
        }
      );
      carRef.current = marker;
      map.geoObjects.add(marker);
    } else {
      carRef.current.geometry.setCoordinates(currentPosition);
      // Balloon va hintni ham yangilash mumkin
      carRef.current.properties.set(
        "hintContent",
        t("onWay", { percent: (fraction * 100).toFixed(1) })
      );
    }

    if (fraction < 0.01 && map.getZoom() < 10) {
      map.setCenter(currentPosition, 10);
    }
  };

  const createRoute = () => {
    const ymaps = ymapsRef.current;
    const map = mapRef.current;
    if (!ymaps || !map || referencePoints.length < 2 || multiRouteRef.current)
      return;

    ymaps.ready(() => {
      const multiRoute = new ymaps.multiRouter.MultiRoute(
        { referencePoints },
        {
          boundsAutoApply: true,
          wayPointVisible: true,
          routeActiveStrokeWidth: 5,
          routeActiveStrokeColor: "#1976d2",
        }
      );
      multiRouteRef.current = multiRoute;
      map.geoObjects.add(multiRoute);

      multiRoute.model.events.add("requestsuccess", () => {
        const activeRoute = multiRoute.getActiveRoute();
        if (!activeRoute) return;
        const distance = activeRoute.properties.get("distance").value;
        setDistanceKm(distance / 1000);
        totalDistanceRef.current = distance;

        const allCoords: number[][] = [];
        const paths = activeRoute.getPaths();
        for (let i = 0; i < paths.getLength(); i++) {
          const path = paths.get(i);
          const segments = path.getSegments();
          for (let j = 0; j < segments.getLength(); j++) {
            const segment = segments.get(j);
            allCoords.push(...segment.geometry.getCoordinates());
          }
        }
        routeCoordsRef.current = allCoords;
        setIsMapReady(true);
      });
    });
  };

  useEffect(() => {
    if (ymapsRef.current && mapRef.current && !multiRouteRef.current)
      createRoute();
  }, [ymapsRef.current, mapRef.current]);

  useEffect(() => {
    let checkReady = setInterval(() => {
      if (ymapsRef.current && mapRef.current) {
        clearInterval(checkReady);
        createRoute();
      }
    }, 300);
    return () => clearInterval(checkReady);
  }, [origin, destination]);

  useEffect(() => {
    if (isMapReady) {
      updateTruckPosition();
      if (updateIntervalRef.current) clearInterval(updateIntervalRef.current);
      updateIntervalRef.current = window.setInterval(updateTruckPosition, 1000);
    }
    return () => {
      if (updateIntervalRef.current) clearInterval(updateIntervalRef.current);
    };
  }, [isMapReady]);

  const isDelivered = currentProgress >= 1;

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
          modules={[
            "multiRouter.MultiRoute",
            "control.ZoomControl",
            "coordSystem.geo",
          ]}
          instanceRef={mapRef}
          onLoad={(ymaps) => {
            ymapsRef.current = ymaps;
          }}
        />
      </YMaps>

      {distanceKm && (
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 border-t-2 border-blue-200/60">
          <div className="relative p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {/* Umumiy masofa */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-blue-200/60 shadow-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                  <FaRoute className="text-white text-lg" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">
                    {t("totalDistance")}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {distanceKm?.toFixed(1) || 0} km
                  </span>
                </div>
              </div>

              {/* Qolgan masofa */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-amber-200/60 shadow-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600">
                  <FaMapMarkerAlt className="text-white text-lg" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">
                    {t("remainingDistance")}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {remainingKm !== null
                      ? `${remainingKm?.toFixed(1) || "0"} km`
                      : "—"}
                  </span>
                </div>
              </div>
              {/* <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-200/60 shadow-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                  <FaClock className="text-white text-lg" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">
                    {t("timeLeft")}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {remainingTime || "—"}
                  </span>
                </div>
              </div> */}
              {/* Status */}
              {/* <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-200/60 shadow-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                 <FaCheckCircle className="text-white text-lg" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">
                    {t("status")}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {remainingTime || "—"}
                  </span>
                </div>
              </div> */}
              <StatusBadge status={statusProps} />
              {/* Status/Yetkazish sanasi */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-orange-200/60 shadow-sm">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg shadow-md ${isDelivered
                      ? "bg-gradient-to-br from-green-500 to-emerald-600"
                      : "bg-gradient-to-br from-orange-500 to-orange-600"
                    }`}
                >
                  {isDelivered ? (
                    <FaCheckCircle className="text-white text-lg" />
                  ) : (
                    <FaCalendarAlt className="text-white text-lg" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">
                    {t("deliveryDate")}
                  </span>
                  {isDelivered ? (
                    <Tag
                      color="green"
                      className="!m-0 !px-2 !py-0.5 !text-xs !font-bold !rounded-lg"
                    >
                      {t("delivered")}
                    </Tag>
                  ) : (
                    <span className="text-sm font-bold text-gray-900">
                      {startEndDate.end ?? "-"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${currentProgress * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YandexMapWithTruck;
