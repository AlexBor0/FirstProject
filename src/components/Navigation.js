import SearchForm from "./SearchForm";
import BtnAddDoc from "./BtnAddDoc";
import UserLogo from "./UserLogo";
import IconEntry from "./IconEntry";
import './../css/Navigation.css';


const Navigation = ( { 
    mainSearchRef,
    typeOfSearch,
    setAddDoc,
    isClicked,
    setShowProfile,
    currentUser,
    setRegEntry,
    host,
    userLogoRef,
    confirm,
    turnExit,
 
} ) => {


    return (
        <nav className="navigation">
           
            <div className="searchContainer" >
    
               <SearchForm
                    ref={mainSearchRef}
                    typeOfSearch={typeOfSearch}
              />               

            </div>

            <div className="btnWrap">
                <BtnAddDoc 
                    type={typeOfSearch} 
                    setAddDoc={setAddDoc}
                    isClicked={isClicked}
                />
            </div> 
            <div className="navMenuUseBlock" >
                <UserLogo  
                    setShowProfile={setShowProfile}
                    currentUser={currentUser}
                    setRegEntry={ setRegEntry } 
                    host={ host }
                    ref={userLogoRef}
                />
                <IconEntry 
                    confirm={ confirm }  
                    turnExit={ turnExit } 
                />
            </div>


            
        </nav>

    )
}

export default Navigation;