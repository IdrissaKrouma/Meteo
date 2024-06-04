import './bodyList.css';
import { useEffect, useState } from 'react';
import { getEmojis } from './../../utils/getEmojis.js';
import { emojis, icons } from './../../utils/emojis.js';
import { connect } from 'react-redux';

function BodyList({ dataPrevision, dataAuth, units,nativeColor }) {
    const [data, setData] = useState([]);
    const [direction, setDirection] = useState('justify');
    const [isDisabled, setIsDisabled] = useState(false);

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
        <div className="body-list">
            <div className='list-hight'>
                <button className='button-listes' onClick={changeG}>
                    <img src={(direction === 'justify' || direction === 'agauche') ? icons.agauche : icons.adroite} alt="NOT FOUND" />
                    <h5>AUTRES VILLES</h5>
                </button>
                <button className='button-listes' onClick={changeD}>
                    <h5>PREVISIONS</h5>
                    <img src={(direction === 'justify' || direction === 'adroite') ? icons.adroite : icons.agauche} alt="NOT FOUND" />
                </button>
            </div>
            <div className="list-low">
                {isDisabled && data.map((elt, index) => {
                    const avgTemp = ((elt.temperature_2m_max + elt.temperature_2m_min) / 2).toFixed(1);
                    return (
                        <div key={index} className={`h-left ${nativeColor} list-component`}>
                            <div className='heure-lieu'>
                                <h4>{emojis.sunrise} {elt.sunrise.slice(11, 16)}</h4>
                                <h4>{emojis.sunset} {elt.sunset.slice(11, 16)}</h4>
                            </div>
                            <h2>{elt.city}</h2>
                            <h1 className='image'>{getEmojis(avgTemp, elt.precipitation_sum, elt.wind_speed_10m_max)}</h1>
                            <h1 className='temp-now'>{avgTemp}{units.temperature}</h1>
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

