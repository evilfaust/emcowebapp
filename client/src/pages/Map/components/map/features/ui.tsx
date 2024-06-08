import React, { useState, useEffect } from "react";
import axios from "axios";
import { Map, YMaps, Placemark } from "@pbe/react-yandex-maps";
import { FiMapPin } from "react-icons/fi";
import { Button, MarkerBar } from "shared/UI";
import "./ui.scss";

import customMarkerIcon from "../../../../../shared/icon/pin1.png"; // Путь к вашей иконке

interface Marker {
  id: number;
  name: string;
  discription: string;
  latitude: number;
  longitude: number;
  photo: string;
  aftephoto: string;
}

const YandexMap: React.FC = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/marker/");
        setMarkers(response.data);
        console.log("Markers:", response.data); // Выводим метки в консоль
      } catch (error) {
        console.error("Error fetching markers:", error);
      }
    };

    fetchMarkers();
  }, []);

  return (
    <div className="map_body">
      <YMaps query={{ apikey: "1a587e3a-630a-4425-bcb2-a7a0dde7b588" }}>
        <Map
          defaultState={{ center: [49.15794957, 142.1032654], zoom: 15 }}
          width="100%"
          height="31.25em"
          modules={["geoObject.addon.balloon"]}
        >
          {markers.map((marker) => (
            <Placemark
              key={marker.id}
              geometry={[marker.latitude, marker.longitude]}
              properties={{
                balloonContentHeader: `Координаты: ${marker.latitude}, ${marker.longitude}`,
                balloonContentBody: `
                <p>Название: ${marker.name}</p>
                <p>Описание: ${marker.discription}</p>
                  Фото:${marker.photo && `<img src="${marker.photo}" alt="Фото" style="max-width: 100%;" />`}
                  После:${marker.aftephoto && `<img src="${marker.aftephoto}" alt="Фото" style="max-width: 100%;" />`}
                  <p>Номер: ${marker.id}</p>
                `
              }}
              options={{
                iconLayout: 'default#image',
                iconImageHref: customMarkerIcon,
                iconImageSize: [40, 40], // Размеры вашей иконки
                iconImageOffset: [-20, -40] // Смещение иконки (если необходимо)
              }}
            />
          ))}
        </Map>
      </YMaps>
      <div className="layout">
        <div className="buttons">
          <MarkerBar>
            <Button>
              <FiMapPin className="pin" size={33} />
            </Button>
          </MarkerBar>
        </div>
        <div className="buttons">
          <MarkerBar>
            <Button>
              <FiMapPin className="pin" size={33} />
            </Button>
          </MarkerBar>
        </div>
      </div>
    </div>
  );
};

export default YandexMap;
