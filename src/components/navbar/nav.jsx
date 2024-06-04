import './nav.css';
import { setInputValue, setNativeColor } from '../../redux/actions';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { icons } from './../../utils/emojis';

function Navbar({ inputValue, nativeColor, setInputValue, setNativeColor }) {
    const [input, setInput] = useState(inputValue);

    useEffect(() => {
        setInput(inputValue);
    }, [inputValue]);

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInput(newValue);
    };

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            setInputValue(input);
            console.log('Nouvelle valeur :', input);
        }
    };

    const changeColor = () => {
        const color = nativeColor === 'blue' ? 'marron' : 'blue';
        setNativeColor(color);
    };

    return (
        <div className="navbar">
            <a href="/#"><h1 className='kaushan-script-regular h1'>Meteo</h1></a>
            <div id='navbar-right'>
                <input
                    className='city'
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyPress}
                    placeholder="Entrez le nom d'une ville..."
                />
                <button onClick={changeColor}>
                    <img className='icons' src={nativeColor === 'blue' ? icons.jourEtNuit1 : icons.jourEtNuit} alt="NOT FOUND" />
                </button>
                <button><img className='icons' src={icons.globe1} alt="NOT FOUND" /></button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    inputValue: state.input.inputValue,
    nativeColor: state.color.nativeColor,
});

const mapDispatchToProps = {
    setInputValue,
    setNativeColor,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
