import { pages } from "widgets";

import logo from "shared/images/header-logo.png";
import "./index.scss";
import { NavLink } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <header>
      <nav className="navbar">
        <img src={logo} alt="logo" />
        <ul>
        {pages.map((page) => (
          <li>
            <NavLink to={page.to}>

            </NavLink>
          </li>
        ))}
        </ul>
      </nav>
    </header>
  );
};
