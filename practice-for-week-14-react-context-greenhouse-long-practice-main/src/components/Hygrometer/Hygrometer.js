import ReactSlider from "react-slider";
import "./Hygrometer.css";
import { useClimate } from "../../context/ClimateContext";
import { useEffect, useState } from "react";

function Hygrometer() {
  const {humidity, setHumidity} = useClimate();

  const [desiredHum,setDesiredHum] = useState(humidity);


  useEffect(() => {
    const humInterval = setInterval(() => {
      const direction = spaceShip(desiredHum,humidity);
      var addAmount = direction * 2;
      if (humidity + direction === desiredHum) {
        addAmount /= 2;
      }
      setHumidity(humidity + addAmount);
      if (humidity === desiredHum) clearInterval(humInterval);
    }, 1000);
    return () => {clearInterval(humInterval)};
  }, [{desiredHum}]);

  return (
    <section>
      <h2>Hygrometer</h2>
      <div className="actual-humid">Actual Humidity: {humidity}%</div>
      <ReactSlider
        value={desiredHum}
        onAfterChange={(val) => { setDesiredHum(val)}}
        className="hygrometer-slider"
        thumbClassName="hygrometer-thumb"
        trackClassName="hygrometer-track"
        ariaLabel={"Hygrometer"}
        orientation="vertical"
        min={0}
        max={100}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => (
          <div {...props} index={state.index}></div>
        )}
        invert
        pearling
        minDistance={1}
      />
    </section>
  );
}

function spaceShip(a,b) {
  if (a < b) return -1;
  if (a === b) return 0;
  if (a > b) return 1;
}

export default Hygrometer;