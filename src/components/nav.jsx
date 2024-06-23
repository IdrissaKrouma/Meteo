import { setInputValue, setNativeColor } from './../redux/actions';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { icons } from './../services/emojis';

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
        
        <div className="flex flex-col sm:flex-row justify-between items-center font-kaushan-script-regular fixed top-0 right-0 left-0 px-6 sm:px-12 py-2 bg-[#FFFEFE] font-kaushan">
            <div className='flex justify-between items-center w-full sm:w-auto'>
                <a href="/#" className="flex items-center">
                    <h1 className="font-kaushan-script-regular text-4xl text-left">Meteo</h1> 
                </a>
                <button onClick={changeColor}>
                    <img className="w-12 transition-transform duration-500 ease-transform block sm:hidden" src={nativeColor === 'blue' ? icons.jourEtNuit1 : icons.jourEtNuit} alt="NOT FOUND" />
                </button>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-3 sm:mt-0">
                <input
                    className="w-full sm:w-auto h-15 py-2 px-4 m-1 text-2xl rounded border border-gray-300 text-center"
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyPress}
                    placeholder="Entrez le nom d'une ville..."
                />
                <button onClick={changeColor}>
                    <img className="w-12 transition-transform duration-500 ease-transform hidden sm:block" src={nativeColor === 'blue' ? icons.jourEtNuit1 : icons.jourEtNuit} alt="NOT FOUND" />
                </button>
                <button>
                    <img className="w-12 transition-transform duration-500 ease-transform hidden sm:block" src={icons.globe1} alt="NOT FOUND" />
                </button>
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
