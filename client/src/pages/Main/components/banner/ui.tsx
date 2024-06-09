import mainDesktop from "shared/images/main-desktop.png";
import mainMobile from "shared/images/main-mobile.png";
import "./ui.scss";

export const Banner: React.FC = () => {
  return (
    <section>
      <div className="wrapper">
        <img src={mainDesktop} alt="Свалкам бой" className="desktop-image" />
      </div>
      <div className="wrapper2">
        <img src={mainMobile} alt="Свалкам бой" className="mobile-image" />
      </div>
    </section>
  );
};
