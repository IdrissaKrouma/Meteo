import { useEffect, useState } from 'react';
import { getEmojis } from './../services/getEmojis.js';
import { emojis, icons } from './../services/emojis.js';
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
    <div className="inline-flex flex-col sc:flex-row items-center justify-center self-center mt-28 sm:mt-24 font-Kelly bg-[#E9E9E8] 
      rounded-2xl w-90 gd:w-80 xg:w-70 ">
      <div className={`flex flex-col justify-center items-center gap-4 rounded-2xl p-3 py-6 height-inherit w-full  sc:w-1/3 gd:w-1/4  datamain ${nativeColor}`}>
        <div className='flex flex-row justify-between w-90'>
          <h4 className='text-xl'>{emojis.sunrise} {dataToday.sunrise.slice(11, 16)}</h4>
          <h4 className='text-xl'>{emojis.sunset} {dataToday.sunset.slice(11, 16)}</h4>
        </div>
        <h2 className='text-2xl'>{dataToday.city}</h2>
        <h1 className='text-8xl'>{weatherEmojis}</h1>
        <h1 className='text-6xl '>{averageTemperature}{units.temperature}</h1>
        <h3 className='text-xl'>{dataToday.day}, {dataToday.time}, {hour}</h3>
      </div>
      <div className='inline-flex flex-col tiny:flex-row gd:flex-col justify-center p-3 gap-5 w-full sc:w-2/3 gd:w-3/4 '>
        <h2 className='text-3xl hidden gd:block'>TEMPERATURES</h2>
        <div className='flex flex-col gd:flex-row gap-4'>
        <h2 className=' text-xl sc:text-2xl block gd:hidden'>TEMPERATURES</h2>
          <div className={`flex flex-row tiny:flex-col justify-between sc:justify-center w-90 sc:w-70 gd:w-50  h-10 tiny:h-20 gd:h-28 bg-[#f5f5f5] rounded-2xl p-1 seconddata ${nativeColor}`}>
            <div className='flex justify-between'>
              <p className='text-xl gd:text-2xl'>Min</p>
              <img className="hidden sc:block w-8 transition-transform duration-500 ease-transform" src={icons.temperature} alt="Not Found" />
            </div>
            <h1 className=' text-center text-3xl'>{dataToday.temperature_2m_min}{units.temperature}</h1>
          </div>
          <div className={`flex flex-row tiny:flex-col justify-between sc:justify-center w-90 sc:w-70 gd:w-50  h-10 tiny:h-20 gd:h-28 bg-[#f5f5f5] rounded-2xl p-1 seconddata ${nativeColor}`}>
            <div className='flex justify-between'>
              <p className='text-xl gd:text-2xl'>Apparente</p>
              <img className=" hidden sc:block w-8 transition-transform duration-500 ease-transform" src={icons.temperature} alt="Not Found" />
            </div>
            <h1 className='text-center text-3xl'>{averageTemperatureApparent}{units.temperature}</h1>
          </div>
          <div className={`flex flex-row tiny:flex-col justify-between sc:justify-center w-90 sc:w-70 gd:w-50  h-10 tiny:h-20 gd:h-28  bg-[#f5f5f5] rounded-2xl p-1 seconddata ${nativeColor}`}>
            <div className='flex justify-between'>
              <p className='text-xl gd:text-2xl'>Max</p>
              <img className="hidden sc:block w-8 transition-transform duration-500 ease-transform" src={icons.temperature} alt="Not Found" />
            </div>
            <h1 className='text-center text-3xl'>{dataToday.temperature_2m_max}{units.temperature}</h1>
          </div>
        </div>
        <h2 className='text-3xl hidden gd:block'>Autres...</h2>
        <div className='flex flex-col gd:flex-row gap-4'>
        <h2 className='text-xl sc:text-2xl block gd:hidden'>AUTRES ...</h2>
          <div className={`flex flex-row tiny:flex-col justify-between sc:justify-center w-90 sc:w-70 sc:w-70 gd:w-50  h-10 tiny:h-20 gd:h-28 bg-[#f5f5f5] rounded-2xl p-1 seconddata ${nativeColor}`}>
            <div className='flex justify-between'>
              <p className='text-xl gd:text-2xl'>Precipitation</p>
              <img className="hidden sc:block w-8 transition-transform duration-500 ease-transform" src={icons.precipitation} alt="Not Found" />
            </div>
            <h1 className='text-center text-3xl'>{dataToday.precipitation_sum}{units.precipitation}</h1>
          </div>
          <div className={`flex flex-row tiny:flex-col justify-between sc:justify-center w-90 sc:w-70 gd:w-50  h-10 tiny:h-20 gd:h-28  bg-[#f5f5f5] rounded-2xl p-1 seconddata ${nativeColor}`}>
            <div className='flex justify-between'>
              <p className='text-xl gd:text-2xl'>Pluie</p>
              <img className="hidden sc:block w-8 transition-transform duration-500 ease-transform" src={icons.pluie} alt="Not Found" />
            </div>
            <h1 className='text-center text-3xl'>{dataToday.precipitation_probability_max}{units.proba_precipitation}</h1>
          </div>
          <div className={`flex flex-row tiny:flex-col justify-between sc:justify-center  w-90 sc:w-70 gd:w-50 h-10 tiny:h-20 gd:h-28  bg-[#f5f5f5] rounded-2xl p-1 seconddata ${nativeColor}`}>
            <div className='flex justify-between'>
              <p className='text-xl gd:text-2xl'>Vent</p>
              <img className="hidden sc:block w-8 transition-transform duration-500 ease-transform" src={icons.vent} alt="Not Found" />
            </div>
            <h1 className='text-center text-3xl'>{dataToday.wind_speed_10m_max}{units.wind}</h1>
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
