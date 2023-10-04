import { Button } from "shared/UI";
import strelka from "../img/underline.png";

import "./ui.scss";

export const Component2: React.FC = () => {
  return (
    <section>
      <div>
        <div className="wrapper">
          Интерактивная карта несанкционированных свалок
        </div>
        <Button variant="second">
          <img className="strelka" src={strelka} />
        </Button>
      </div>
    </section>
    
  );
};
