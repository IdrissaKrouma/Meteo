import { useState , useEffect, useCallback} from 'react';
import FormatWeathherDataDaily from './formatWeatherDataDaily.js';

function Api(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [geoloc, setGeoloc] = useState({latitude :0, longitude : 0});
    const [weatherUnits, setWeatherUnits] = useState({});
    const [weatherData, setWeatherData] = useState([]);

    const fetchweather = useCallback(async (url) =>{
        setError(false)

        try {
            const res = await fetch(url);
            const data = await res.json() ;
            console.log(data);
            if(Object.keys(data) === 0){
                setError(true);
            }
            else{
                //formated daily data
                const formatedDataDaily = FormatWeathherDataDaily(data.daily)
                setWeatherData(formatedDataDaily);
                //unity
                setWeatherUnits({
                    rain : data.daily_units.temperature_2m_max,

                })
            }
        } catch (error) {
            
        }
    },[]);

    useEffect(() =>{
        setIsLoading(true);
        if(!navigator.geolocation){
            alert("Votre navigateur n'aotorise pas la geolocalisation");
        }

        getGeolocalisation();

        fetchweather(
            `https://api.open-meteo.com/v1/forecast?latitude=${geoloc.latitude}&longitude=${geoloc.longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=GMT`
        ).then(()=>setIsLoading(false));
    },[fetchweather, geoloc.latitude, geoloc.longitude]);

    const getGeolocalisation = () =>{
        navigator.geolocation.getCurrentPosition((position) =>{
            setGeoloc({
                latitude: position.coords.latitude,
                longitude : position.coords.longitude,
            });
        }, () =>{
            setError(true);
        }); 
        
    };

    if(isLoading){
        return (
            <div>
                <p>Chargement...</p>
            </div>
        )
    }
    if(error){
        return (
            <div>
                <p>Une erreur est survenue lors du chargement des previsions
                     meteo...</p>
            </div>
        )
    }

    return ('It is my weather api');
}

export default Api ;