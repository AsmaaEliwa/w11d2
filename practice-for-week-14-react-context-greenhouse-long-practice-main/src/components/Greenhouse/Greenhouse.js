import dayImage from './images/greenhouse-day.jpg';
import nightImage from './images/greenhouse-night.jpg';
import './Greenhouse.css';
import ThemeProvider from '../../context/ThemeContext';
import { useTheme } from '../../context/ThemeContext';

import LightSwitch from './LightSwitch';
import ClimateStats from './ClimateStats';
import { useContext } from 'react';

function Greenhouse() {
  const { themeName, setThemeName } = useTheme();
  const themeImage = () => {
    if (themeName === 'day') return dayImage;
    return nightImage;
  }
  return (
    <section>
      <img className='greenhouse-img'
        src={themeImage()}
        alt='greenhouse'
      />
      <LightSwitch />
      <ClimateStats />
    </section>
  );
}

export default Greenhouse;