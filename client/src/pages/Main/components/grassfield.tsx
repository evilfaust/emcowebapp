import { Button } from "shared/UI";

import underline from "./img/underline.png"
import grass from "./img/crack.png";

import "./index.scss";
export const GrassField: React.FC = () => {
  return (
    <>
      <div className="grass">
        
        <img src={grass} />
        <Button variant="primary">
            <img src={underline} />
        </Button>
      </div>
    </>
  );
};
