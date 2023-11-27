import React, { useState, useEffect } from "react";
import axios from "axios";
import { Map, YMaps, Placemark } from "@pbe/react-yandex-maps";
import { FiMapPin } from "react-icons/fi";
import { Button, MarkerBar } from "shared/UI";
import "./ui.scss";



interface Marker {
  id: number;
  coordinates: [number, number];
  title: string;
  description: string;
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
              geometry={marker.coordinates}
              options={{
                iconLayout: 'default#image',
                iconImageHref: 'islands#circleIcon',
              }}
              properties={{
                balloonContentBody: marker.description,
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
