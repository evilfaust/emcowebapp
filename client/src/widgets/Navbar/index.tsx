import logo from "shared/images/logo.png";
import "./index.scss";

export const Navbar: React.FC = () => {
  return (
    <header>
      <nav className="navbar">
        <img src={logo} alt="logo" />
      </nav>
    </header>
  );
};
