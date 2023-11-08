import React from "react";
import dump from "shared/images/counter base.png"
import head_dump from "shared/images/counter head.png"
import "./ui.scss";

export const Counter: React.FC = () => {
  return (
    <section>
      <div className="counter_head">
        <img src={head_dump}/>
        <div className="counter_base">
            <img src={dump} alt="xz"/>
            <p className="text">Свалкам бой</p>
        </div>
      </div>
    </section>
  );
};
