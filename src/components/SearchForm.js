import { useState, forwardRef } from 'react';
import { IoSearch } from "react-icons/io5";
import VacancyInput from "./VacancyInput";
import { useInputArrowPress } from "./useInputArrowPress";
import './../css/SearchForm.css';

const SearchForm = forwardRef(( { 
    typeOfSearch,
    vacBaseChunck,
    getDataItems,

}, ref) => {

    const { selectedIndex, setSelectedIndex, arrowPress, resetSelection } = useInputArrowPress();
    const [newRequest, setNewRequest] = useState({
        company: "",
        vacancy: ""
    })
    const [selectValue, setSelectValue] = useState('');
    
    const resetInput = (e, options) => {
        e.preventDefault();
        const {
            setSelectValue,
            resetFields,
            setNewItem,
            hideList
        } = options;
        setSelectValue("");
        setNewItem(prev => {
            const updated = { ...prev };
            resetFields.forEach(field => (updated[field] = ""));
            return updated;
        });
        resetSelection();
        hideList(false);
    };



    return (
            <form id="searchForm">
                {/* <input 
                    ref={ref} 
                    type="search"  
                    placeholder={typeOfSearch?"Пошук кандидата" : "Пошук вакансії"} 
                    name="search"
                /> */}
                <VacancyInput
                    vacBaseChunck={vacBaseChunck}
                    pHolder = {typeOfSearch?"Пошук кандидата" : "Пошук вакансії"} 
                    arrowPress={arrowPress}
                    getDataItems={getDataItems}
                    resetInput={resetInput}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    setNewItem={setNewRequest}
                    selectValue={selectValue}
                    setSelectValue={setSelectValue}
                    ref={ref}
                />
                <button type="submit" className="btnSearch" onClick={(e) =>{
                    e.preventDefault();
                    }}> 
                    <IoSearch />
                </button>
            </form>
    )
});


export default SearchForm;