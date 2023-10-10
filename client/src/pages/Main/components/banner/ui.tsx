import grass from "shared/images/main-desktop.png"

import "./ui.scss";

export const Banner: React.FC = () => {
  return (
    <section>
      <div className="wrapper">
        <img src={grass} alt="Свалкам бой" />
      </div>
    </section>
  );
};
