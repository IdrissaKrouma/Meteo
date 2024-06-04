import './footer.css'
import {icons} from './../../utils/emojis'
import {useState, useEffect} from 'react'

function MyFooter (){
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 1000); // Attendez 1 seconde avant de déclencher l'animation
      return () => clearTimeout(timer); // Nettoyez le timer si le composant est démonté
    }, []);
    return(
        <footer className="myfooter">
            <div className="footer-left">
                <a href="/#"><h2 className='kaushan-script-regular h2'>Meteo</h2></a>
                <div className="left-low">
                    <a className='link' href="https://github.com/IdrissaKrouma" target="_blank" rel="noopener noreferrer">
                        <img className='icons' src={icons.github} alt="NOT FOUND" />
                    </a>
                    <a className='link' href="https://gitlab.com/krouma" target="_blank" rel="noopener noreferrer">
                        <img className='icons' src={icons.gitlab} alt="NOT FOUND" />
                    </a>
                    <a className='link' href="https://www.linkedin.com/in/el-hadj-idrissa-krouma-75b058236/" target="_blank" rel="noopener noreferrer">
                        <img className='icons' src={icons.linkdin} alt="NOT FOUND" />
                    </a>
                </div>
            </div>
            <div className={`orbit ${isActive ? 'active' : ''}`}>
                <a className='link orbit-btn btn1' href="https://developer.mozilla.org/fr/docs/Web/HTML" target="_blank" rel="noopener noreferrer" >
                    <img className='icons' src={icons.html} alt="NOT FOUND" />
                </a>
                <a className='link orbit-btn btn2' href="https://developer.mozilla.org/fr/docs/Web/CSS" target="_blank" rel="noopener noreferrer" >
                    <img className='icons' src={icons.css} alt="NOT FOUND" />
                </a>
                <a className='link orbit-btn btn3' href="https://developer.mozilla.org/fr/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" >
                    <img className='icons' src={icons.js} alt="NOT FOUND" />
                </a>
                <a className='link orbit-btn btn4' href="https://www.git-scm.com/" target="_blank" rel="noopener noreferrer" >
                    <img className='icons' src={icons.git} alt="NOT FOUND" />
                </a>
                <a className='link orbit-btn btn5' href="https://fr.legacy.reactjs.org/" target="_blank" rel="noopener noreferrer" >
                    <img className='icons' src={icons.react} alt="NOT FOUND" />
                </a>
                <a className='link orbit-btn btn6' href="https://tailwindui.com/components?ref=sidebar" target="_blank" rel="noopener noreferrer" >
                    <img className='icons' src={icons.tailwin} alt="NOT FOUND" />
                </a>
            </div>
            
            <div className="footer-right">
                <h2 className='kelly-slab-regular h2'>0700181811/0575320561</h2>
                <h2 className='libre-barcode-128-regular h2 text-bare'>Meteo</h2>
            </div>
        </footer>
    )
}
export default MyFooter;