import React from 'react';
import gear from './../img/gear.svg';
import './../css/Header.css';
import BtnTogSearch from "./BtnTogSearch";
import IconEntry from "./IconEntry";
import UserLogo from "./UserLogo";

const Header = (props) => {

   let title;
    props.typeOfSearch ? title="персоналу" : title="роботи";

  return (
    <div className="App">
      <header className="AppHeader">
        <div className="appLogo">
          <img src={ gear } className="appLogo1" alt="logo" />
          <img src={ gear } className="appLogo2" alt="logo" />
        </div> 
        <div id='logotype' ><span >JobFinder</span>
        </div>  
        <BtnTogSearch 
          tabIndex={1} 
          typeOfSearch={ props.typeOfSearch } 
          setTypeOfsearch={ props.setTypeOfsearch }
        /> 
        <div className="AppHeaderRight">
          <UserLogo  
            setShowProfile={props.setShowProfile}
            userNameLogo={ props.userNameLogo } 
            userImage={ props.userImage } 
            regEntry={ props.regEntry } 
            host={ props.host }
          />
          <IconEntry 
            confirm={ props.confirm } 
            svgHttp={ props.svgHttp } 
            svgXlink={ props.svgXlink } 
            turnExit={ props.turnExit } 
          />
        </div>
      </header>
      <div className='conteinerH1'>
        <h1>
          Сторінка пошуку { title }
        </h1>
      </div>
    </div>
  );
}
export default Header;
