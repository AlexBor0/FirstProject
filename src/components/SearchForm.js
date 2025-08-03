import { useState, forwardRef } from 'react';
import { IoSearch, IoRocket  } from "react-icons/io5";
import VacancyInput from "./VacancyInput";
import { useInputArrowPress } from "./useInputArrowPress";
import './../css/SearchForm.css';

const SearchForm = forwardRef(( { 
    typeOfSearch,
    vacBaseChunck,
    getDataItems,
    host,
    axios,
    setCandidates,
	setVacancies

}, ref) => {

    const { selectedIndex, setSelectedIndex, arrowPress, resetSelection } = useInputArrowPress();
    const [selectValue, setSelectValue] = useState(''),
          [isLoading, setIsLoading] = useState(false),
          [error, setError] = useState(null);
    
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
            if (!selectValue.trim()) {
                setError('Введіть запит');
            return;
        }

    setIsLoading(true);
    setError(null);
    try {
        const title = selectValue.toLowerCase();
        const titleUpper = title.charAt(0).toUpperCase() + title.slice(1);
        const firstWord = title.split(' ')[0];
        const firstWordUpper = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
        const endpoint = typeOfSearch ? 'Candidates' : 'Vacancies';
        const populate = typeOfSearch ? 'foto' : 'company.logo';
            
                const response = await axios.get(`
                        ${host}/api/${endpoint}?filters[title]
                        [$containsi]=${title}&filters[title]
                        [$containsi]=${titleUpper}&filters[title]
                        [$containsi]=${firstWord}&filters[title]
                        [$containsi]=${firstWordUpper}&populate[${populate}]=true
                    `);
                    if (response.data.data) {
                       typeOfSearch ? setCandidates(response.data.data) : setVacancies(response.data.data);
                    } else {
                        setError('Інформацію не знайдено');
                     }
        } catch (err) {
            setError('Помилка при отриманні даних');
            console.error('Помилка запита:', err);
         } finally {
            setIsLoading(false);
            }
       
            
      };

    return (
            <form 
                id="searchForm" 
                onSubmit={(e) => {
                    e.preventDefault();
                    setCandidates([]);
                    setVacancies([]);
                    fetchNewRequest()
                }}
            >

                <VacancyInput
                    vacBaseChunck={vacBaseChunck}
                    pHolder = {typeOfSearch?"Пошук кандидата" : "Пошук вакансії"} 
                    arrowPress={arrowPress}
                    getDataItems={getDataItems}
                    resetInput={resetInput}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    setNewItem={() => {}}
                    selectValue={selectValue}
                    setSelectValue={setSelectValue}
                    ref={ref}
                    btnColor="rgb(210, 247, 247)"
                />
                <button type="submit" className="btnSearch" disabled={isLoading}> 
                    {isLoading ? <IoRocket /> : <IoSearch />}
                </button>
                {error && <div className="error">{error}</div>}
            </form>
    )
});


export default SearchForm;