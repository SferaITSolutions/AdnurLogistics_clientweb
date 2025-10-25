'use client';

import { Map, YMaps } from '@pbe/react-yandex-maps';
import React, { useEffect, useRef, useState } from 'react';

import { useOrderDetailsStore } from '@/features/order-details/lib/store';
import { Tag } from 'antd';

interface Props {
  height?: number | string;
  origin?: string;
  destination?: string;
  speedKmH?: number;
}

const YandexMapWithTruck: React.FC<Props> = ({
  height = 400,
  origin = 'Yiwu, China',
  destination = 'Tashkent, Uzbekistan',
  speedKmH = 200,
}) => {
  const { startEndDate } = useOrderDetailsStore();
  const mapRef = useRef<any>(null);
  const ymapsRef = useRef<any>(null);
  const carRef = useRef<any>(null);
  const multiRouteRef = useRef<any>(null);
  const routeCoordsRef = useRef<number[][]>([]);
  const totalDistanceRef = useRef<number>(0);
  const updateIntervalRef = useRef<number | null>(null);

  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [isMapReady, setIsMapReady] = useState(false); // Yangi state

  const referencePoints = [
    origin?.trim() ? origin : null,
    destination?.trim() ? destination : null,
  ].filter(Boolean);

  const calculateCurrentFraction = () => {
    const startDate = new Date(startEndDate.start?.replace(/\//g, '-') || '');
    const endDate = new Date(startEndDate.end?.replace(/\//g, '-') || '');
    const now = new Date();

    const totalMs = endDate.getTime() - startDate.getTime();
    const passedMs = now.getTime() - startDate.getTime();
    return Math.max(0, Math.min(1, passedMs / totalMs));
  };

  const getPositionAtFraction = (fraction: number, coords: number[][], ymaps: any) => {
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

    const currentPosition = getPositionAtFraction(fraction, coords, ymaps);

    if (!carRef.current) {
      const marker = new ymaps.Placemark(
        currentPosition,
        {
          hintContent: `Yo'lning ${(fraction * 100).toFixed(1)}%`,
          balloonContent: `Tezlik: ${speedKmH} km/h`,
          iconContent: 'Truck',
        },
        {
          iconLayout: 'default#image',
          iconImageHref: '/truck.png',
          iconImageSize: [40, 40],
          iconImageOffset: [-20, -20],
        },
      );

      carRef.current = marker;
      map.geoObjects.add(marker);
    } else {
      carRef.current.geometry.setCoordinates(currentPosition);
    }

    if (fraction < 0.01 && map.getZoom() < 10) {
      map.setCenter(currentPosition, 10);
    }
  };

  const createRoute = () => {
    const ymaps = ymapsRef.current;
    const map = mapRef.current;

    if (!ymaps || !map || referencePoints.length < 2 || multiRouteRef.current) {
      return;
    }

    // YMaps to'liq yuklanganini kutish
    ymaps.ready(() => {
      const multiRoute = new ymaps.multiRouter.MultiRoute(
        { referencePoints },
        {
          boundsAutoApply: true,
          wayPointVisible: true,
          routeActiveStrokeWidth: 5,
          routeActiveStrokeColor: '#1976d2',
        },
      );

      multiRouteRef.current = multiRoute;
      map.geoObjects.add(multiRoute);

      multiRoute.model.events.add('requestsuccess', () => {
        const activeRoute = multiRoute.getActiveRoute();
        if (!activeRoute) return;

        const distance = activeRoute.properties.get('distance').value;
        const distanceKm = distance / 1000;
        setDistanceKm(distanceKm);
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

        // Map tayyor ekanligini bildirish
        setIsMapReady(true);

        // Birinchi marta marker qo‘yish
        updateTruckPosition();

        // Har 1 soniyada yangilash (test uchun)
        if (updateIntervalRef.current) clearInterval(updateIntervalRef.current);
        updateIntervalRef.current = window.setInterval(updateTruckPosition, 1000);
      });

      multiRoute.model.events.add('requestfail', (e: any) => {
        console.error('Route xato:', e.get('error'));
      });
    });
  };

  useEffect(() => {
    if (ymapsRef.current && mapRef.current && !multiRouteRef.current) {
      console.log('✅ Map va YMaps tayyor, yo‘l yaratilmoqda...');
      createRoute();
    }
  }, [ymapsRef.current, mapRef.current]);
  // 1️⃣ YMaps va Map yuklanganda yo‘lni yaratish

  useEffect(() => {
    let checkReady: any;

    const waitForYmapsAndMap = () => {
      if (ymapsRef.current && mapRef.current) {
        console.log('✅ YMaps va Map tayyor!');
        clearInterval(checkReady);
        createRoute();
      }
    };

    // Har 300ms da tekshiradi
    checkReady = setInterval(waitForYmapsAndMap, 300);

    return () => clearInterval(checkReady);
  }, [origin, destination]);

  // Map tayyor bo‘lganda animatsiyani boshlash
  useEffect(() => {
    if (isMapReady) {
      updateTruckPosition();
    }
  }, [isMapReady]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (updateIntervalRef.current) clearInterval(updateIntervalRef.current);
      if (mapRef.current) mapRef.current.geoObjects.removeAll();
    };
  }, []);

  const isDelivered = currentProgress >= 1;

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
          instanceRef={mapRef}
          onLoad={(ymaps) => {
            ymapsRef.current = ymaps;
          }}
        />
      </YMaps>

      {distanceKm && (
        <div className="p-3 text-center text-sm text-gray-700 bg-gray-50 border-t">
          Masofa: <b>{distanceKm.toFixed(1)} km</b> | Tezlik: <b>{speedKmH} km/h</b> | Progress:{' '}
          <b>{(currentProgress * 100).toFixed(1)}%</b> |{' '}
          {isDelivered ? <Tag color="green">Yetkazib berilgan</Tag> : <b>{startEndDate.end}</b>}
        </div>
      )}
    </div>
  );
};

export default YandexMapWithTruck;
