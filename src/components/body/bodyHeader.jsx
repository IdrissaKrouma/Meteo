import './bodyHeader.css';
import { useEffect, useState } from 'react';
import { getEmojis } from './../../utils/getEmojis.js';
import { emojis, icons } from './../../utils/emojis.js';
import { connect } from 'react-redux';

function BodyHeader({ dataToday, units, nativeColor }) {
  const [averageTemperature, setAverageTemperature] = useState(0);
  const [averageTemperatureApparent, setAverageTemperatureApparent] = useState(0);
  const [weatherEmojis, setWeatherEmojis] = useState('');
  const [hour, setHour] = useState('');

  useEffect(() => {
    if (!dataToday) return;

    const avTemp = ((dataToday.temperature_2m_max + dataToday.temperature_2m_min) / 2).toFixed(1);
    const avTempApparent = ((dataToday.apparent_temperature_max + dataToday.apparent_temperature_min) / 2).toFixed(1);
    const weatherEmojis = getEmojis(avTemp, dataToday.precipitation_sum, dataToday.wind_speed_10m_max);

    setAverageTemperature(avTemp);
    setWeatherEmojis(weatherEmojis);
    setAverageTemperatureApparent(avTempApparent);

    const updateHour = () => {
      const now = new Date();
      const getHours = now.getHours().toString().padStart(2, '0');
      const getMinutes = now.getMinutes().toString().padStart(2, '0');
      const hours = `${getHours}h${getMinutes}`;
      setHour(hours);
    };

    updateHour();
    const intervalId = setInterval(updateHour, 60 * 1000);

    // Nettoyer l'intervalle à la suppression du composant
    return () => clearInterval(intervalId);
  }, [dataToday]);

  if (!dataToday || !units) {
    return <div>Erreur...</div>;
  }

  return (
    <div className="body-header">
      <div className={`h-left ${nativeColor}`}>
        <div className='heure-lieu'>
          <h4>{emojis.sunrise} {dataToday.sunrise.slice(11, 16)}</h4>
          <h4>{emojis.sunset} {dataToday.sunset.slice(11, 16)}</h4>
        </div>
        <h2 className='h2'>{dataToday.city}</h2>
        <h1 className='image'>{weatherEmojis}</h1>
        <h1 className='temp-now'>{averageTemperature}{units.temperature}</h1>
        <h3>{dataToday.day}, {dataToday.time}, {hour}</h3>
      </div>
      <div className='h-right'>
      {/* <h2 className='h2'>TEMPERATURES</h2> */}
        <div className='data-temp'>
          <div className={`components ${nativeColor}`}>
            <div>
              <p className='h1'>Min</p>
              <img className='icons' src={icons.temperature} alt="Not Found" />
            </div>
            <h1 className='h1'>{dataToday.temperature_2m_min}{units.temperature}</h1>
          </div>
          <div className={`components ${nativeColor}`}>
            <div>
              <p className='h1'>Apparente</p>
              <img className='icons' src={icons.temperature} alt="Not Found" />
            </div>
            <h1 className='h1'>{averageTemperatureApparent}{units.temperature}</h1>
          </div>
          <div className={`components ${nativeColor}`}>
            <div>
              <p className='h1'>Max</p>
              <img className='icons' src={icons.temperature} alt="Not Found" />
            </div>
            <h1 className='h1'>{dataToday.temperature_2m_max}{units.temperature}</h1>
          </div>
        </div>
        {/* <h2 className='h2'>AUTRES ...</h2> */}
        <div className='autres'>
          <div className={`components ${nativeColor}`}>
            <div>
              <p className='h1'>Precipitation</p>
              <img className='icons' src={icons.precipitation} alt="Not Found" />
            </div>
            <h1 className='h1'>{dataToday.precipitation_sum}{units.precipitation}</h1>
          </div>
          <div className={`components ${nativeColor}`}>
            <div>
              <p className='h1'>Pluie</p>
              <img className='icons' src={icons.pluie} alt="Not Found" />
            </div>
            <h1 className='h1'>{dataToday.precipitation_probability_max}{units.proba_precipitation}</h1>
          </div>
          <div className={`components ${nativeColor}`}>
            <div>
              <p className='h1'>Vent</p>
              <img className='icons' src={icons.vent} alt="Not Found" />
            </div>
            <h1 className='h1'>{dataToday.wind_speed_10m_max}{units.wind}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  nativeColor: state.color.nativeColor,
});

export default connect(mapStateToProps)(BodyHeader);
