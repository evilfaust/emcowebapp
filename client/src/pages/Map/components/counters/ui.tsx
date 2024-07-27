import React, { useState, useEffect } from "react";
import axios from "axios";
import wrapper_text from "shared/images/info-map.png";
import wrapper from "shared/images/img_svalok.png";
import potImage from "shared/images/counter base.png"; 
import leafImage from "shared/images/counter head.png"; 
import "./ui.scss";

// Определяем интерфейс для маркера
interface Marker {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  is_active: boolean;
  photo?: string;
  aftephoto?: string;
  discription?: string;
  is_admin?: boolean;
}

export const CounterNumber: React.FC = () => {
  const [activeMarkerCount, setActiveMarkerCount] = useState<number>(0);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get<Marker[]>('https://jurikartiweb.ru/api/markers/');
        const markers = response.data;
        const activeMarkers = markers.filter(marker => marker.is_active);
        setActiveMarkerCount(activeMarkers.length);
      } catch (error) {
        console.error("Ошибка при получении маркеров:", error);
      }
    };

    fetchMarkers();
  }, []);

  return (
    <section>
      <div className="layout">
        <div className="wrapper left">
          <img src={wrapper} className="centered" alt="Свалки" />
          <div className="overlapping-images">
            <img src={leafImage} className="leaf-image" alt="Листок" />
            <div className="number">{activeMarkerCount}</div> {/* Обновлено */}
            <img src={potImage} className="pot-image" alt="Горшок" />
          </div>
        </div>
        <div className="wrapper right">
          <img className="centered" src={wrapper_text} alt="Текст" />
        </div>
      </div>
    </section>
  );
};
