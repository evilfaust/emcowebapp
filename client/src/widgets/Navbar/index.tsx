import { pages } from "widgets";
import { Item } from "./features/item/ui";
import { NavLink } from "react-router-dom";

import logo from "shared/images/header-logo.png";
import "./index.scss";

export const Navigation: React.FC = () => {
  return (
    <header>
      <nav className="navbar">
        <NavLink to={"/"}>
          <img src={logo} alt="logo" />
        </NavLink>
        <ul>
          {pages.map((page) => (
            <Item label={page.label} link={page.to} value={page.value} />
          ))}
        </ul>
      </nav>
    </header>
  );
};
