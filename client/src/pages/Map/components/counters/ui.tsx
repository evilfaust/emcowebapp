import React from "react";
import wrapper_text from "shared/images/info-map.png";
import wrapper from "shared/images/img_svalok.png";
import potImage from "shared/images/counter base.png"; 
import leafImage from "shared/images/counter head.png"; 
import "./ui.scss";

export const CounterNumber: React.FC = () => {
  return (
    <section>
      <div className="layout">
        <div className="wrapper left">
          <img src={wrapper} className="centered" alt="Свалки" />
          <div className="overlapping-images">
            <img src={leafImage} className="leaf-image" alt="Листок" />
            <div className="number">40</div>
            <img src={potImage} className="pot-image" alt="Горшок" />
          </div>
        </div>
        <div className="wrapper right">
          <img className="centered" src={wrapper_text} alt="Текст" />
        </div>
      </div>
    </section>
  );
};
