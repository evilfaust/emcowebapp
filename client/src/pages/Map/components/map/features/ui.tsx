import { Map, YMaps } from "@pbe/react-yandex-maps";
import { FiMapPin } from "react-icons/fi";
import { Button, MarkerBar } from "shared/UI";
import "./ui.scss";

export const YandexMap: React.FC = () => {
  return (
    <div className="map_body">
      <YMaps query={{ apikey: "1a587e3a-630a-4425-bcb2-a7a0dde7b588" }}>
        <Map
          defaultState={{ center: [49.15794957, 142.1032654], zoom: 15 }}
          width="100%"
          height="31.25em"
        />
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
