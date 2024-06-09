import React from 'react';
import { AiOutlineArrowDown } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import "./InteractiveMapButton.scss";

export const InteractiveMapButton: React.FC = () => {
  return (
    <div className="interactive-map-container">
      <div className="red-circle"></div>
      <div className="interactive-map-button">
        <span className="interactive-map-text">
          ИНТЕРАКТИВНАЯ КАРТА<br />
          НЕСАНКЦИОНИРОВАННЫХ<br />
          СВАЛОК
        </span>
        <NavLink to="/map">
          <div className="circle">
            <AiOutlineArrowDown size={24} />
          </div>
        </NavLink>
      </div>
    </div>
  );
};
