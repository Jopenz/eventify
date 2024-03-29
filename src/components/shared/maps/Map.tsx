import { GoogleMap } from '@capacitor/google-maps';
import React, { useEffect, useRef } from 'react';
import './Maps.css';
import { environment } from '../../../environments/environment';

interface MapProps {
  lat: number;
  lng: number;
  zoom: number;
  title: string;
  snippet: string;
}

const Map: React.FC<MapProps> = ({ lat, lng, title, snippet }) => {
  const mapRef = useRef<HTMLElement>();
  const newMapRef = useRef<GoogleMap>();

  useEffect(() => {
    const initMap = async (component: HTMLElement) => {
      newMapRef.current = await GoogleMap.create({
        id: 'app-map',
        element: component,
        apiKey: environment.mapsKey,
        config: {
          disableDefaultUI: true,
          center: {
            lat,
            lng,
          },
          zoom: 14,
        },
      });
      newMapRef.current.addMarker({
        title,
        snippet,
        coordinate: {
          lat,
          lng,
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
