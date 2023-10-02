import { pages } from "./pages";

import logo from "./img/logo.png";
import "./index.scss";

export const Navbar: React.FC = () => {
  return (
    <header>
      <nav className="navbar">
        <img src={logo} />
      </nav>
    </header>
  );
};
