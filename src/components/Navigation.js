import {  IoSearch } from "react-icons/io5";
import './../css/Navigation.css';

const Navigation = ({fix, mainSearchRef, typeOfSearch}) => {


    return (
       <nav className="navigation">
        <div >
            <div className="searchBlock">
                        <div className={`search ${fix}`}>
                            <form id="searchForm">
                            <input ref={mainSearchRef} type="search"  placeholder={typeOfSearch?"Пошук кандидата" : "Пошук вакансії"} name="search"/>
                            <button type="submit" className="btnSearch" onClick={(e) =>{
                                    e.preventDefault();
                                    }}> 
                                    <IoSearch />
                            </button>
                            </form>                
                           
                              
                        </div> 
                      </div>

        </div>
          
       </nav>

    )
}

export default Navigation;