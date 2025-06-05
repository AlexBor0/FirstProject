import SearchForm from "./SearchForm";
import BtnAddDoc from "./BtnAddDoc";
import './../css/Navigation.css';


const Navigation = ( { 
    mainSearchRef,
    typeOfSearch,
    setAddDoc
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
                  />
                </div> 


            
        </nav>

    )
}

export default Navigation;