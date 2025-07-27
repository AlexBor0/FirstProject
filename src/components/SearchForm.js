import { useState, forwardRef } from 'react';
import { IoSearch } from "react-icons/io5";
import VacancyInput from "./VacancyInput";
import { useInputArrowPress } from "./useInputArrowPress";
import './../css/SearchForm.css';

const SearchForm = forwardRef(( { 
    typeOfSearch,
    vacBaseChunck,
    getDataItems,
    host,
    axios,
    candidates,
    setCandidates

}, ref) => {

    const { selectedIndex, setSelectedIndex, arrowPress, resetSelection } = useInputArrowPress();
    const [newRequest, setNewRequest] = useState({
        // company: "",
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
        const fetchNewRequest = async () => {
        const title = selectValue.toLowerCase();
        const titleUpper = title.charAt(0).toUpperCase() + title.slice(1);
        const firstWord = title.split(' ')[0];
        const firstWordUpper = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);

        const response = await axios.get(`
                ${host}/api/Candidates?filters[title]
                [$containsi]=${title}&filters[title]
                [$containsi]=${titleUpper}&filters[title]
                [$containsi]=${firstWord}&filters[title]
                [$containsi]=${firstWordUpper}&populate[foto]=true
            `);
            if (response) {
                setCandidates(response.data.data);
            }

      };

    return (
            <form id="searchForm">

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
                    btnColor="rgb(210, 247, 247)"
                />
                <button type="submit" className="btnSearch" onClick={(e) =>{
                    e.preventDefault();
                    setCandidates([]);
                    fetchNewRequest()
                    }}> 
                    <IoSearch />
                </button>

            </form>
    )
});


export default SearchForm;