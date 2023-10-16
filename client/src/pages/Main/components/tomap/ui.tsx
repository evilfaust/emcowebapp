import { AiOutlineArrowDown } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Button } from "shared/UI";

import "./ui.scss";

export const ToMapButton: React.FC = () => {
  return (
    <section>
      <div className="layout">
        <div className="wrapper">
          <p className="wrapper-txt">
            Интерактивная карта несанкционированных свалок
          </p>
          <NavLink to="/map">
            <Button variant="second">
              <AiOutlineArrowDown size={50} />
            </Button>
          </NavLink>
        </div>
        <div className="wrapper">
          <p>
            Это <strong>интерактивное приложение</strong>, разработанное
            специально для борьбы с несанкционированными свалками.{" "}
          </p>
          <p>
            При помощи этого приложения пользователи смогут эффективно
            маркировать и сообщать о местонахождении несанкционированных свалок,
            что поможет местным властям, волонтерам и экологическим организациям
            в ликвидации и предотвращении таких проблем.
          </p>
          <p>
            <strong>
              Свалкам бой! - ваш надежный партнер в борьбе за чистоту и
              экологическую ответственность.
            </strong>{" "}
            Совместными усилиями мы можем сохранить нашу планету для будущих
            поколений!
          </p>
        </div>
      </div>
    </section>
  );
};
