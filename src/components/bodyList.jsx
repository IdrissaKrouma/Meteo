import { useEffect, useState } from 'react';
import { getEmojis } from './../services/getEmojis.js';
import { emojis, icons } from './../services/emojis.js';
import { connect } from 'react-redux';

function BodyList({ dataPrevision, dataAuth, units,nativeColor }) {
    const [data, setData] = useState([]);
    const [direction, setDirection] = useState('justify');
    const [isDisabled, setIsDisabled] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const changeD = () => {
        if (direction === 'justify') {
            setDirection('agauche');
            setData(dataPrevision);
        } else {
            setDirection('justify');
        }
        setIsDisabled(!isDisabled);
    };

    const changeG = () => {
        if (direction === 'justify') {
            setDirection('adroite');
            setData(dataAuth);
        } else {
            setDirection('justify');
        }
        setIsDisabled(!isDisabled);
    };

    useEffect(() => {
        if (!dataPrevision || !dataAuth) return;
        setData(dataPrevision);  // Initialiser les données avec les prévisions par défaut
    }, [dataPrevision, dataAuth]);

    if (!dataPrevision || !units) {
        return <div>Erreur...</div>;
    }

    return (
        <div className="flex flex-grow flex-col justify-center items-center self-center pl-2 pr-2
            bg-[#E9E9E8] rounded-2xl w-90 gd:w-80 xg:w-70">
            <div className='flex flex-row justify-between items-center m-5 w-full'>
                <div className="relative"
                    onMouseEnter={() => setShowMessage(true)}
                    onMouseLeave={() => setShowMessage(false)}
                >
                    <button className='flex flex-row button-listes' onClick={changeG}>
                        <img src={(direction === 'justify' || direction === 'agauche') ? icons.agauche : icons.adroite} alt="NOT FOUND" />
                        <h5 className='text-xl hidden sm:block'>AUTRES VILLES</h5>
                    </button>
                    {showMessage && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 p-2 bg-black text-white text-center rounded shadow-lg">
                            AUTRES VILLES
                        </div>
                    )}
                </div>
                <div className="relative"
                    onMouseEnter={() => setShowMessage(true)}
                    onMouseLeave={() => setShowMessage(false)}
                >
                    <button className='flex flex-row button-listes' onClick={changeD}>
                        <h5 className='text-xl hidden sm:block'>PREVISIONS</h5>
                        <img src={(direction === 'justify' || direction === 'adroite') ? icons.adroite : icons.agauche} alt="NOT FOUND" />
                    </button>
                    {showMessage && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 p-2 bg-black text-white text-center rounded shadow-lg">
                            PREVISIONS
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1  sl:grid-cols-2 gap-4 w-full p-4">
                {isDisabled && data.map((elt, index) => {
                    const avgTemp = ((elt.temperature_2m_max + elt.temperature_2m_min) / 2).toFixed(1);
                    return (
                        <div key={index} className={`flex flex-col justify-center items-center rounded-2xl box-border border border-gray-300 gap-3 p-2 datamain ${nativeColor}`}>
                            <div className='flex flex-row justify-between w-90'>
                                <h4 className='text-xl'>{emojis.sunrise} {elt.sunrise.slice(11, 16)}</h4>
                                <h4 className='text-xl'>{emojis.sunset} {elt.sunset.slice(11, 16)}</h4>
                            </div>
                            <h2 className='text-2xl'>{elt.city}</h2>
                            <h1 className='text-8xl'>{getEmojis(avgTemp, elt.precipitation_sum, elt.wind_speed_10m_max)}</h1>
                            <h1 className='text-6xl '>{avgTemp}{units.temperature}</h1>
                            <h3>{elt.day},{elt.time}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    nativeColor: state.color.nativeColor,
});
  
export default connect(mapStateToProps)(BodyList);

