import { GoogleMap } from '@capacitor/google-maps';
import React, { useEffect, useRef } from 'react';
import './Maps.css';

interface MapProps {
  lat: number;
  lng: number;
  zoom: number;
  title: string;
  snippet: string;
}

const Map: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  const newMapRef = useRef<GoogleMap>();

  useEffect(() => {
    const initMap = async (component: HTMLElement) => {
      newMapRef.current = await GoogleMap.create({
        id: 'app-map',
        element: component,
        apiKey: 'AIzaSyDo0MzQpiB1N_vo5Cawwf5sBxMBvPM08bo',
        config: {
          disableDefaultUI: true,
          center: {
            lat: 33.6,
            lng: -117.9,
          },
          zoom: 14,
        },
      });
      newMapRef.current.addMarker({
        title: 'Hello Capacitor!',
        snippet: 'This plugin is awesome!',
        coordinate: {
          lat: 33.6,
          lng: -117.9,
        },
      });
    };
    if (mapRef.current) {
      initMap(mapRef.current);
    }
  }, [mapRef]);

  useEffect(() => {
    if (newMapRef.current) {
    }
  }, [newMapRef]);

  return (
    <div className='map-wrapper'>
      <capacitor-google-map
        ref={mapRef}
        style={{
          display: 'inline-block',
          width: 275,
          height: 400,
        }}
      ></capacitor-google-map>
    </div>
  );
};

export default React.memo(Map);
