import { size } from "@floating-ui/core";
import { info } from "console";
import React from "react";
import dump from "shared/images/counter base.png";
import head_dump from "shared/images/counter head.png";
import wrapper_text from "shared/images/info-map.png";
import wrapper from "shared/images/img_svalok.png";
import "./ui.scss";

export const CounterNumber: React.FC = () => {
  return (
    <section>
      <div className="layout">
        <div className="wrapper">
          <img src={wrapper} />
          <div className="wrapper_counter">
            <img
              className="counter_head"
              src={head_dump}
              alt="Счетчик убранных свалок"
            />
            <img className="counter_base" src={dump} alt="Подставка" />
          </div>
        </div>
        <div className="wrapper">
          <img className="info" src={wrapper_text} />
        </div>
      </div>
    </section>
  );
};
