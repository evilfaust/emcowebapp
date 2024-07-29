import React, { useState, useEffect } from "react";
import axios from "axios";
import { Map, YMaps, Placemark, ZoomControl } from "@pbe/react-yandex-maps";
import { useSearchParams } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { Button } from "shared/UI";
import "./ui.scss";

import customMarkerIcon from "../../../../../shared/icon/Vector red.png";
import customMarkerIcon2 from "../../../../../shared/icon/Vector green.png";

interface Marker {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  photo: string | File | null;
  aftephoto: string;
  is_active: boolean;
}

const YandexMap: React.FC = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [newMarker, setNewMarker] = useState<Partial<Marker>>({});
  const [tempCoordinates, setTempCoordinates] = useState<[number, number] | null>(null);
  const [addingMarker, setAddingMarker] = useState(false);
  const [buttonText, setButtonText] = useState("ДОБАВИТЬ ТОЧКУ НА КАРТУ");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchMarkers();
  }, []);

  const fetchMarkers = async () => {
    try {
      const response = await axios.get("https://jurikartiweb.ru:8000/marker/");
      setMarkers(response.data);
      console.log("Markers:", response.data);
    } catch (error) {
      console.error("Error fetching markers:", error);
    }
  };

  const handleMapClick = (e: any) => {
    if (addingMarker) {
      const coords = e.get("coords");
      setTempCoordinates(coords);
      setNewMarker((prev) => ({
        ...prev,
        latitude: coords[0],
        longitude: coords[1],
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMarker((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setNewMarker((prev) => ({
      ...prev,
      photo: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (newMarker.photo instanceof File) {
      formData.append("photo", newMarker.photo);
    }
    formData.append("name", newMarker.name || "");
    formData.append("description", newMarker.description || "");
    formData.append("latitude", newMarker.latitude?.toString() || "");
    formData.append("longitude", newMarker.longitude?.toString() || "");
    try {
      const response = await axios.post("https://jurikartiweb.ru:8000/marker/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMarkers([...markers, response.data]);
      setNewMarker({});
      setTempCoordinates(null);
      setAddingMarker(false);
      setButtonText("МЕТКА ДОБАВЛЕНА");
    } catch (error) {
      console.error("Error saving marker:", error);
    }
  };

  const handleAddMarkerClick = () => {
    if (addingMarker) {
      setAddingMarker(false);
      setButtonText("ДОБАВИТЬ ТОЧКУ НА КАРТУ");
    } else {
      setAddingMarker(true);
      setButtonText("МЕТКА НЕ ДОБАВЛЕНА");
    }
  };

  const mapCenter = [
    parseFloat(searchParams.get('latitude') || '49.15794957'),
    parseFloat(searchParams.get('longitude') || '142.1032654')
  ];
  const mapZoom = searchParams.get('latitude') && searchParams.get('longitude') ? 18 : 15;

  return (
    <div className="map_body">
      <YMaps query={{ apikey: "1a587e3a-630a-4425-bcb2-a7a0dde7b588" }}>
        <Map
          defaultState={{ center: mapCenter, zoom: mapZoom }}
          width="100%"
          height="31.25em"
          onClick={handleMapClick}
          modules={["geoObject.addon.balloon"]}
        >
          {markers.map((marker) => (
            <Placemark
              key={marker.id}
              geometry={[marker.latitude, marker.longitude]}
              properties={{
                balloonContentHeader: `Координаты: ${marker.latitude}, ${marker.longitude}`,
                balloonContentBody: `
                  ${marker.is_active ? `<p style="color: green;"><strong>Убрана</strong></p>` : ""}
                  <p>Название: ${marker.name}</p>
                  <p>Описание: ${marker.description}</p>
                  Фото:${marker.photo ? `<img src="${marker.photo}" alt="Фото" style="max-width: 100%;" />` : "Нет фото"}
                  После:${marker.aftephoto ? `<img src="${marker.aftephoto}" alt="Фото" style="max-width: 100%;" />` : "Нет фото после"}
                  <p>Номер: ${marker.id}</p>
                `,
              }}
              options={{
                iconLayout: 'default#image',
                iconImageHref: marker.is_active ? customMarkerIcon2 : customMarkerIcon,
                iconImageSize: [40, 47],
                iconImageOffset: [-20, -40],
              }}
              balloonOpen={searchParams.get('latitude') === marker.latitude.toString() && searchParams.get('longitude') === marker.longitude.toString()}
            />
          ))}
          {tempCoordinates && addingMarker && (
            <Placemark
              geometry={tempCoordinates}
              options={{
                iconLayout: 'default#image',
                iconImageHref: customMarkerIcon,
                iconImageSize: [40, 47],
                iconImageOffset: [-20, -40],
              }}
            />
          )}
          <ZoomControl options={{ position: { top: 10, right: 10 } }} />
        </Map>
      </YMaps>
      <div className="buttons">
        <Button onClick={handleAddMarkerClick}>
          <FiMapPin /> {buttonText}
        </Button>
      </div>
      {addingMarker && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Название</label>
            <input
              type="text"
              name="name"
              value={newMarker.name || ""}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="description">Описание</label>
            <textarea
              name="description"
              value={newMarker.description || ""}
              onChange={handleInputChange}
              maxLength={300}
              required
              style={{ height: "100px", resize: "none" }}
            />
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              required
            />
            <label htmlFor="latitude">Координаты</label>
            <input
              type="text"
              name="latitude"
              placeholder="Широта(Заполняется автоматически)"
              value={newMarker.latitude?.toString() || ""}
              onChange={handleInputChange}
              readOnly
            />
            <input
              type="text"
              name="longitude"
              placeholder="Долгота(Заполняется автоматически)"
              value={newMarker.longitude?.toString() || ""}
              onChange={handleInputChange}
              readOnly
            />
            <button type="submit">Создать метку</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default YandexMap;
