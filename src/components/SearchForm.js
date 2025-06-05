import { IoSearch } from "react-icons/io5";
import './../css/SearchForm.css';

const SearchForm = ({ref, typeOfSearch}) => {

    return (
            <form id="searchForm">
                <input 
                    ref={ref} 
                    type="search"  
                    placeholder={typeOfSearch?"Пошук кандидата" : "Пошук вакансії"} 
                    name="search"/>
                <button type="submit" className="btnSearch" onClick={(e) =>{
                        e.preventDefault();
                        }}> 
                        <IoSearch />
                </button>
            </form>
    )
}

export default SearchForm;