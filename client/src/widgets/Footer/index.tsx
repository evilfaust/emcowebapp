import React from "react";
import "./index.scss";
import emco from "./img/emco.png"

export const Footer: React.FC = () => {
  return (
    <div className="footer-bottom">
      <div className="container">
        <div className="text">
          Этот проект разработан при поддержке сотрудников
          <div>и учеников детского технопарка EMCO TECH</div>
          <div className="emco">
          <img src={emco} alt="EMCO TECH"/>
          </div>
        </div>
      </div>
    </div>
  );
};
