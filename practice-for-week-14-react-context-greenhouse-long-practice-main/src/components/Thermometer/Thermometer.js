import ReactSlider from "react-slider";
import './Thermometer.css';
import { useClimate } from "../../context/ClimateContext";
import { useState, useEffect } from "react";


function Thermometer() {
  const {temperature, setTemperature} = useClimate();

  const [desiredTemp,setDesiredTemp] = useState(temperature);

 

  useEffect(() => {
    const tempInterval = setInterval(() => {
      setTemperature(temperature + spaceShip(desiredTemp,temperature));
      if (temperature === desiredTemp) clearInterval(tempInterval);
    }, 1000);
    return () => {clearInterval(tempInterval)};
  }, [{desiredTemp}]);

  return (
    <section>
      <h2>Thermometer</h2>
      <div className="actual-temp">Actual Temperature: {temperature}°F</div>
      <ReactSlider
        value={desiredTemp}
        onAfterChange={(val) => {setDesiredTemp(val)}}
        className="thermometer-slider"
        thumbClassName="thermometer-thumb"
        trackClassName="thermometer-track"
        ariaLabel={"Thermometer"}
        orientation="vertical"
        min={0}
        max={120}
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

export default Thermometer;