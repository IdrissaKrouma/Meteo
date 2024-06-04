import './App.css';
import FormatWeathherDataDaily from './utils/formatWeatherDataDaily.js';
import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/navbar/nav';
import BodyHeader from './components/body/bodyHeader';
import MyFooter from './components/footer/footer';
import BodyList from './components/body/bodyList';
import villesAuth from "./utils/villes.js";
import { connect } from 'react-redux';
import { icons } from './utils/emojis.js';


function App({ inputValue }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [geoloc, setGeoloc] = useState({ lat: 5.4123949, lon: -3.9776488, city: 'Ma Position' });
  const [Auth, setAuth] = useState([]);
  const [weatherUnits, setWeatherUnits] = useState({});
  const [weatherData, setWeatherData] = useState([]);

  const getGeolocalisation = useCallback(async () => {
    try {
      if (!navigator.geolocation) {
        alert("Votre navigateur n'autorise pas la géolocalisation");
      } else {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setGeoloc((prevState) => ({ ...prevState, lat, lon }));
      }
    } catch (error) {
      console.error('getGeolocation error:', error);
    }
  }, []);

  const fetchweather = useCallback(async (url, cityName) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (Object.keys(data).length === 0) {
        setError(true);
      } else {
        const formatedDataDaily = FormatWeathherDataDaily(data.daily, cityName);
        const units = {
          precipitation: data.daily_units.precipitation_sum,
          wind: data.daily_units.wind_speed_10m_max,
          temperature: data.daily_units.apparent_temperature_max,
          proba_precipitation: data.daily_units.precipitation_probability_max,
        };
        return { data: formatedDataDaily, units: units };
      }
    } catch (error) {
      console.error('fetchweather error :', error);
      setError(true);
    }
  }, []);

  const fetchCityName = useCallback(async () => {
    try {
      const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${geoloc.lat}&lon=${geoloc.lon}&zoom=10&addressdetails=1`;
      const res = await fetch(geocodingUrl);
      if (!res.ok) {
        throw new Error('fetchCityName:La requête a échoué');
      }
      const data = await res.json();
      if (data.address && data.address.city) {
        setGeoloc((prevState) => ({ ...prevState, city: data.address.city }));
      } else {
        console.log('fetchCityName:Aucun nom de ville trouvé pour les coordonnées spécifiées.');
      }
    } catch (error) {
      console.error('fetchCityName:Erreur lors de la récupération du nom de la ville:', error);
    }
  }, [geoloc.lat, geoloc.lon]);

  const fetchDatabyPosition = useCallback(async (lat, lon, cityName) => {
    try {
      const result = await fetchweather(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timezone=GMT`,
        cityName
      );
      if (!result) {
        throw new Error('fetchDatabyPosition :', error);
      }
      setWeatherData(result.data);
      setWeatherUnits(result.units);
    } catch (error) {
      console.error('fetchDatabyPosition :', error);
      // setError(true);
    }
  }, [fetchweather]);

  const fetchDataByCityName = useCallback(async () => {
    const geocodingUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`;
    if (!inputValue) {
      console.log('fetchDataByCityName : Input is null');
    } else {
      try {
        const response = await fetch(geocodingUrl);
        if (!response.ok) {
          throw new Error('fetchDataByCityName: La requête a échoué');
        }
        const data = await response.json();
        if (data.length === 0) {
          throw new Error('fetchDataByCityName: Aucune coordonnée trouvée pour la ville spécifiée');
        }
        const { lat, lon } = data[0];
        fetchDatabyPosition(lat, lon, inputValue);
      } catch (error) {
        console.error('fetchDataByCityName: Erreur lors de la récupération des coordonnées géographiques :', error);
        // setError(true);
      }
    }
  }, [inputValue, fetchDatabyPosition]);

  const fetchAuth = useCallback(async () => {
    const promises = villesAuth.map(async (elt) => {
      const result = await fetchweather(
        `https://api.open-meteo.com/v1/forecast?latitude=${elt.latitude}&longitude=${elt.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum`,
        elt.cityName
      );
      return result.data[0];
    });

    try {
      const Data = await Promise.all(promises);
      setAuth(Data);
    } catch (error) {
      console.error('fetchAuth:Erreur lors de la récupération des données météorologiques :', error);
      // setError(true);
    }
  }, [fetchweather]);

  const fetchMainPrediction = useCallback(() => {
    if (!inputValue) {
      fetchDatabyPosition(geoloc.lat, geoloc.lon, geoloc.city);
    } else {
      fetchDataByCityName();
    }
  }, [inputValue, fetchDatabyPosition, fetchDataByCityName, geoloc.lat, geoloc.lon, geoloc.city]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await getGeolocalisation()
          .then(fetchCityName)
          .then(fetchAuth)
          .then(fetchMainPrediction);
        // setIsActive(true);
      } catch (error) {
        setError(true);
        setIsLoading(true);
      } finally {
        setError(false);
        setIsLoading(false);
      }
    };

    loadData();
  }, [getGeolocalisation, fetchCityName, fetchAuth, fetchMainPrediction]);

  if (isLoading) {
    return (
      <div className='loading'>
        <img className='logo' src='./logo-meteo1.png' alt='NOT FOUND'/>
      </div>
    );
  }

  if (error) {
    return (
      <div className='error'>
        <img className='icons-error' src={icons.error} alt='NOT FOUND' />
        <h1 className='temp-now'>ERROR...</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <br />
      <BodyHeader dataToday={weatherData[0]} units={weatherUnits} />
      <br />
      <BodyList dataPrevision={weatherData.slice(1)} dataAuth={Auth} units={weatherUnits} />
      <br />
      <MyFooter />
    </div>
  );
}

const mapStateToProps = (state) => ({
  inputValue: state.input.inputValue,
});

export default connect(mapStateToProps)(App);
