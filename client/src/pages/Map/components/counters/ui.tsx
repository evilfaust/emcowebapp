import { size } from "@floating-ui/core";
import { info } from "console";
import React from "react";
import wrapper_text from "shared/images/info-map.png";
import wrapper from "shared/images/img_svalok.png";
import "./ui.scss";

export const CounterNumber: React.FC = () => {
  return (
    <section>
      <div className="layout">
        <div className="wrapper">
          <img src={wrapper} className="centered" style={{ marginLeft: 'auto' }}/>
          <div className="wrapper_counter centered" style={{ marginBottom: "auto" }}>
            <h1>СВАЛОК УБРАЛИ:</h1>
            <span>
              <strong>40</strong>
            </span>
          </div>
        </div>
        <div className="wrapper">
          <img className="centered" src={wrapper_text} />
        </div>
      </div>
    </section>
  );
};
