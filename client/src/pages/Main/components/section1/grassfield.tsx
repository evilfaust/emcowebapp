import grass from "../img/crack.png";

import "./index.scss";

export const GrassField: React.FC = () => {
  return (
    <section>
      <div className="grass">
        <img src={grass} alt="Свалкам бой" />
        
      </div>
    </section>
  );
};
