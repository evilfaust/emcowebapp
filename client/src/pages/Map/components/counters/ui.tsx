import React from "react";
import wrapper_text from "shared/images/info-map.png";
import wrapper from "shared/images/img_svalok.png";
import "./ui.scss";

export const CounterNumber: React.FC = () => {
  return (
    <section>
      <div className="layout">
        <div className="wrapper">
          <img
            src={wrapper}
            className="centered"
            style={{ marginLeft: "auto" }}
          />

        </div>
        <div className="wrapper">
          <img className="centered" src={wrapper_text} />
        </div>
      </div>
    </section>
  );
};
