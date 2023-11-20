import React from "react";
import dump from "shared/images/counter base.png";
import head_dump from "shared/images/counter head.png";
import "./ui.scss";

export const CounterNumber: React.FC = () => {
  return (
    <section>
      <div className="counter_head">
        <img src={head_dump} alt="Счетчик убранных свалок" />
        <div className="counter_base">
          <img src={dump} alt="Подставка" />
          <p className="text">Свалкам бой</p>
        </div>
      </div>
    </section>
  );
};
