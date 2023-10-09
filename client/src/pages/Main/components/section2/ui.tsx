import { Button } from "shared/UI";
import strelka from "../img/underline.png";

import "./ui.scss";

export const Component2: React.FC = () => {
  return (
    <section>
      <div className="layout">
        <div className="wrapper">
          <p className="wrapper-txt">
            Интерактивная карта несанкционированных свалок
          </p>
          <Button variant="second">
            <img className="strelka" src={strelka} />
          </Button>
        </div>
        <div className="wrapper1">
          <p className="wrapper-txt2">
            Это <strong>интерактивное приложение</strong>, разработанное специально для борьбы с
            несанкционированными свалками. При помощи этого приложения
            пользователи смогут эффективно маркировать и сообщать о
            местонахождении несанкционированных свалок, что поможет местным
            властям, волонтерам и экологическим организациям в ликвидации и
            предотвращении таких проблем.<strong>Свалкам бой! - ваш надежный партнер в
            борьбе за чистоту и экологическую ответственность.</strong> Совместными
            усилиями мы можем сохранить нашу планету для будущих поколений!
          </p>
        </div>
      </div>
    </section>
  );
};
