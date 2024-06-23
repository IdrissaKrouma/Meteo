import {icons} from './../services/emojis'
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
        <footer className="inline-flex flex-col xs:flex-row justify-between gap-1 px-7 bg-[#FFFEFE] w-full">
            <div className="inline-flex flex-col gap-2">
                <a href="/#"><h2 className='font-kaushan-script-regular text-3xl'>Meteo</h2></a>
                <div className="flex flex-row">
                    <a className='inline-block rounded-3xl p-2 hover:bg-[#E9E9E8] rotation' href="https://github.com/IdrissaKrouma" target="_blank" rel="noopener noreferrer">
                        <img className='icons' src={icons.github} alt="NOT FOUND" />
                    </a>
                    <a className='inline-block rounded-3xl p-2 hover:bg-[#E9E9E8] rotation' href="https://gitlab.com/krouma" target="_blank" rel="noopener noreferrer">
                        <img className='icons' src={icons.gitlab} alt="NOT FOUND" />
                    </a>
                    <a className='inline-block rounded-3xl p-2 hover:bg-[#E9E9E8] rotation' href="https://www.linkedin.com/in/el-hadj-idrissa-krouma-75b058236/" target="_blank" rel="noopener noreferrer">
                        <img className='icons' src={icons.linkdin} alt="NOT FOUND" />
                    </a>
                </div>
            </div>
            <div className={`orbit ${isActive ? 'active' : ''} inline-flex items-center self-end hidden lg:block`}>
                <a className='inline-block rounded-3xl p-2 hover:bg-[#E9E9E8] rotation orbit-btn btn1' href="https://developer.mozilla.org/fr/docs/Web/HTML" target="_blank" rel="noopener noreferrer" >
                    <img className='icons' src={icons.html} alt="NOT FOUND" />
                </a>
                <a className='inline-block rounded-3xl p-2 hover:bg-[#E9E9E8] rotation orbit-btn btn2' href="https://developer.mozilla.org/fr/docs/Web/CSS" target="_blank" rel="noopener noreferrer" >
                    <img className='icons' src={icons.css} alt="NOT FOUND" />
                </a>
                <a className='inline-block rounded-3xl p-2 hover:bg-[#E9E9E8] rotation orbit-btn btn3' href="https://developer.mozilla.org/fr/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" >
                    <img className='icons' src={icons.js} alt="NOT FOUND" />
                </a>
                <a className='inline-block rounded-3xl p-2 hover:bg-[#E9E9E8] rotation orbit-btn btn4' href="https://www.git-scm.com/" target="_blank" rel="noopener noreferrer" >
                    <img className='icons' src={icons.git} alt="NOT FOUND" />
                </a>
                <a className='inline-block rounded-3xl p-2 hover:bg-[#E9E9E8] rotation orbit-btn btn5' href="https://fr.legacy.reactjs.org/" target="_blank" rel="noopener noreferrer" >
                    <img className='icons' src={icons.react} alt="NOT FOUND" />
                </a>
                <a className='inline-block rounded-3xl p-2 hover:bg-[#E9E9E8] rotation orbit-btn btn6' href="https://tailwindui.com/components?ref=sidebar" target="_blank" rel="noopener noreferrer" >
                    <img className='icons' src={icons.tailwin} alt="NOT FOUND" />
                </a>
            </div>
            <div className="inline-flex flex-row items-end gap-2">
                <h2 className='font-kaushan-script-regular text-2xl'>0700181811/0575320561</h2>
                {/* <h2 className='libre-barcode-128-regular text-2xl  border'>Meteo</h2> */}
            </div>
        </footer>
    )
}
export default MyFooter;