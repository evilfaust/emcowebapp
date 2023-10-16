import { MarkerProps } from "./type";
import "./index.scss"

export const MarkerBar: React.FC <MarkerProps> = ({children}) => {
  return <div className="marker">
    {children}
  </div>;
};
