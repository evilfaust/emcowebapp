import { JunkInfo, MapSection, CounterNumber } from "./components";

function Map() {
  return (
    <div style={{backgroundColor:"black"}}>

      <MapSection />
      <CounterNumber />
      <JunkInfo />
    </div>
  );
}

export default Map;
