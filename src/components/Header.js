import React, {useEffect} from 'react';
import gear from './../img/gear.svg';
import './../css/Header.css';
import BtnTogSearch from "./BtnTogSearch";
import IconEntry from "./IconEntry";
import UserLogo from "./UserLogo";
import BtnBurgerMenu from "./BtnBurgerMenu";

const Header = ( { 
  typeOfSearch,
  setTypeOfsearch,
  host,
  setShowProfile,
  currentUser,
  setRegEntry,
  confirm,
  svgHttp,
  svgXlink,
  turnExit,
  userLogoRef,
  fix,
  isClicked,
  setIsClicked
} ) => {

   let thing, title;
    typeOfSearch ? thing = "персоналу" : thing="роботи";
    typeOfSearch ? title = "работодавця":title = "шукача";
    
    useEffect (() => {
      document.title = `Для ${title}`;
    });

    const showBurgerMenu = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 350) {
        return true;
      }
      else if (screenWidth >= 350 && screenWidth < 420) {
        return !fix;
      }
      else {
        return false;
      }
    };
    
  return (
    <div className="App">
      <header className="AppHeader">
        <div className="appLogo">
          <img src={ gear } className="appLogo1" alt="logo" />
          <img src={ gear } className="appLogo2" alt="logo" />
        </div> 
        <div id='logotype' ><span >Jober</span>
        </div>
        {currentUser.userStatus
        ?("")
        :(<BtnTogSearch 
          tabIndex={1} 
          typeOfSearch={ typeOfSearch } 
          setTypeOfsearch={ setTypeOfsearch }
        />)  
        }  
         
        <div className="AppHeaderRight" 
        >
          <UserLogo  
            setShowProfile={setShowProfile}
            currentUser={currentUser}
            setRegEntry={ setRegEntry } 
            host={ host }
            ref={userLogoRef}
          />
          <IconEntry 
            confirm={ confirm } 
            svgHttp={ svgHttp } 
            svgXlink={ svgXlink } 
            turnExit={ turnExit } 
          />
          {showBurgerMenu() && <BtnBurgerMenu
            setIsClicked={setIsClicked}
            isClicked={isClicked}
          />}
        </div>
      </header>
      <div className='conteinerH1'>
        <h1>
          Сторінка пошуку { thing }
        </h1>
      </div>
    </div>
  );
};
export default Header;
