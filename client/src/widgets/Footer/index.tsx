import React from "react";
import footer_logo from "shared/images/footer-logo.png";

import "./index.scss";

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__text">
          Этот проект разработан при поддержке сотрудников
          <div>и учеников детского технопарка EMCO TECH</div>
          <div className="footer__image">
            <img src={footer_logo} alt="EMCO TECH" />
          </div>
        </div>
      </div>
    </div>
  );
};
