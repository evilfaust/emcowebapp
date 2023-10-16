import { Map, YMaps } from "@pbe/react-yandex-maps";
import { FiMapPin } from "react-icons/fi";
import { Button } from "shared/UI";

export const YandexMap: React.FC = () => {
  return (
    <div>
      <YMaps query={{ apikey: "1a587e3a-630a-4425-bcb2-a7a0dde7b588" }}>
        <Map
          defaultState={{ center: [49.15794957, 142.1032654], zoom: 15 }}
          width="100%"
          height="31.25em"
        />
      </YMaps>
      <div>
        <Button>

          <FiMapPin className="pin" size={33}/>
        </Button>
      </div>
    </div>
  );
};
