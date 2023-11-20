import { size } from "@floating-ui/core";
import { info } from "console";
import React from "react";
import dump from "shared/images/counter base.png";
import head_dump from "shared/images/counter head.png";
import indo from "shared/images/info-map.png";
import "./ui.scss";

export const CounterNumber: React.FC = () => {
  return (
    <section className="body">
      <img className="info" src={indo} />
      <div className="counter_head">
        <img
          className="counter_head"
          src={head_dump}
          alt="Счетчик убранных свалок"
        />
      </div>
      <div className="counter_base">
        <img className="counter_base" src={dump} alt="Подставка" />
      </div>
    </section>
  );
};
