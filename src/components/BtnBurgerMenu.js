
import './../css/BtnBurgerMenu.css';

const BtnBurgerMenu = ({isClicked, setIsClicked}) => {



const click = () => {
        setIsClicked(prev => !prev);
        // setIsOpenMenu(prev => !prev);

    };

    return (
       <button 
            className={`burgerMenu ${isClicked ? 'fixed' : ''}`}
            onClick={click}
        >
            <div className="string">
                <span className={`line1${isClicked ? 'active' : ''}`}></span>
                <span className={`line2${isClicked ? 'active' : ''}`}></span>
                <span className={`line3${isClicked ? 'active' : ''}`}></span>
                <span className={`line4${isClicked ? 'active' : ''}`}></span>
            </div> 
        </button>

    )
}

export default BtnBurgerMenu;