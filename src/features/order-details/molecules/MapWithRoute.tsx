'use client';

import { Map, YMaps } from '@pbe/react-yandex-maps';
import React, { useEffect, useRef, useState } from 'react';

import { useOrderDetailsStore } from '@/features/order-details/lib/store';
import { dateToNumber } from '@/shared/utils/formatter';
import { logger } from '@/shared/utils/logger';
import { Tag } from 'antd';

interface Props {
  height?: number | string;
  origin?: string;
  destination?: string;
  speedKmH?: number;
}

// const DEFAULT_ORIGIN = 'Yiwu, Zhejiang, China';
// const DEFAULT_DESTINATION = 'Tashkent, Uzbekistan';

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
  const { startEndDate } = useOrderDetailsStore();

  // For testing with the specified current date: October 23, 2025
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDay();

  const isStatus =
    dateToNumber(startEndDate.end || '') -
      dateToNumber(`${currentYear}/${currentMonth}/${currentDay}`) <=
    0;

  // Remove !isStatus condition to always show the route if data is available
  const referencePoints = [
    origin?.trim() && startEndDate.start && startEndDate.end ? origin : null,
    destination?.trim() && startEndDate.start && startEndDate.end ? destination : null,
  ];
  logger.log(startEndDate);

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
        routeActiveStrokeColor: '#1976d2',
      },
    );

    map.geoObjects.removeAll();
    map.geoObjects.add(multiRoute);

    // Add event for request fail to debug
    multiRoute.model.events.add('requestfail', (event: any) => {
      console.error('MultiRoute request failed:', event.get('error'));
    });

    multiRoute.model.events.add('requestsuccess', () => {
      const activeRoute = multiRoute.getActiveRoute();
      if (!activeRoute) return;

      const distance = activeRoute.properties.get('distance').value; // metrda
      const distanceKm = distance / 1000;
      setDistanceKm(distanceKm);

      const path = activeRoute.getPaths().get(0);
      const coords = path.geometry.getCoordinates(); // number[][] formatidagi koordinatalar

      console.log('coords', coords);
      console.log('coords.length', coords.length);

      if (coords.length > 0) {
        addTruckAtCurrentPosition(coords, distance, ymaps);
      }
    });
  };

  // --- Oddiy placemarkni joriy pozitsiyaga qo'yish ---
  const addTruckAtCurrentPosition = (coords: number[][], totalDistance: number, ymaps: any) => {
    // Avvalgi markerni o‘chirish
    if (carRef.current) {
      mapRef.current.geoObjects.remove(carRef.current);
    }

    // Start va end datalarni Date ob'ektlariga aylantirish (format: 'YYYY/MM/DD')
    const startParts = startEndDate.start?.split('/') || [];
    const startDate = new Date(
      parseInt(startParts[0]),
      parseInt(startParts[1]) - 1,
      parseInt(startParts[2]),
    );
    const endParts = startEndDate.end?.split('/') || [];
    const endDate = new Date(
      parseInt(endParts[0]),
      parseInt(endParts[1]) - 1,
      parseInt(endParts[2]),
    );
    const nowDate = new Date(currentYear, currentMonth - 1, currentDay);

    // Fraction hisoblash (o'tgan vaqt / umumiy vaqt)
    const totalMs = endDate.getTime() - startDate.getTime();
    const passedMs = nowDate.getTime() - startDate.getTime();
    let fraction = passedMs / totalMs;
    fraction = Math.max(0, Math.min(1, fraction)); // 0-1 oralig'ida saqlash
    console.log('fraction', fraction);

    // Target masofa (metrda)
    const targetDistance = fraction * totalDistance;
    console.log('targetDistance', targetDistance);

    // Yo'l bo'ylab masofani hisoblash va pozitsiyani topish
    let currentDistance = 0;
    let prevPoint = coords[0];
    let currentPosition = prevPoint; // Agar topilmasa, boshida qolsin

    for (let i = 1; i < coords.length; i++) {
      const point = coords[i];
      const segmentDist = ymaps.coordSystem.geo.getDistance(prevPoint, point);

      if (currentDistance + segmentDist >= targetDistance) {
        // Segment ichida interpolyatsiya
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

    // Agar target totaldan katta bo'lsa, oxirgi nuqtani o'rnatish (xavfsizlik uchun)
    if (currentDistance < targetDistance) {
      currentPosition = coords[coords.length - 1];
    }

    console.log('currentPosition', currentPosition);

    // Oddiy default placemark
    const marker = new ymaps.Placemark(currentPosition, {
      hintContent: 'Joriy pozitsiya',
      balloonContent: 'Mahsulot shu yerda',
    });

    carRef.current = marker;
    mapRef.current.geoObjects.add(marker);

    // Markerni ko'rish uchun xaritani markerga markazlash
    mapRef.current.setCenter(currentPosition, 10);
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
          load: 'package.full',
          lang: 'en_RU',
          apikey: process.env.NEXT_PUBLIC_YANDEX_API_KEY,
        }}
      >
        <Map
          defaultState={{ center: [40.7831, 65.9667], zoom: 5 }}
          width="100%"
          height={height}
          modules={['multiRouter.MultiRoute', 'control.ZoomControl', 'coordSystem.geo']}
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
          📅 Yetib kelish vaqti:{' '}
          {isStatus ? (
            <Tag color="green">Yetkazib berilgan</Tag>
          ) : (
            <b>{startEndDate.end ?? 'Sana belgilanmagan'}</b>
          )}
        </div>
      )}
    </div>
  );
};

export default YandexMapWithTruck;
