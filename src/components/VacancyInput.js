import React, {useState, useRef} from "react";
import { IoClose } from "react-icons/io5";
import VacancySelect from "./VacancySelect";


const VacancyInput = ({ arrowPress, getDataItems, resetInput, selectedIndex, setSelectedIndex, vacBaseChunck, pHolder, setNewItem, selectValue, setSelectValue }) => {

    const [vacancyQuery, setVacancyQuery] = useState(''),
          [showVacancyList, setShowVacancyList] = useState(false);
          
    const inputVacancyRef = useRef(null);

    const dinListV = () => {
        if (!vacancyQuery || !vacBaseChunck) return [];
        const queryWords = vacancyQuery.toLowerCase().split(/\s+/);
        const N = queryWords.length;
        const startsWithFullQuery = vacBaseChunck.filter((el) => {
            const elWords = el.toLowerCase().split(/\s+/);
            if (elWords.length < N) return false;
            for (let i = 0; i < N - 1; i++) {
                if (elWords[i] !== queryWords[i]) return false;
            }
            return elWords[N - 1].startsWith(queryWords[N - 1]);
        });
    
        if (startsWithFullQuery.length > 0) {
            return startsWithFullQuery.sort().slice(0, 7);
        }
    
        let results = [];
        for (let startWordIdx = 0; startWordIdx < N; startWordIdx++) {
            const currentQueryWords = queryWords.slice(startWordIdx);
            const currentN = currentQueryWords.length;
    
            const startsWithWord = vacBaseChunck.filter((el) => {
                const elWords = el.toLowerCase().split(/\s+/);
                if (elWords.length < currentN) return false;
                for (let i = 0; i < currentN - 1; i++) {
                    if (elWords[i] !== currentQueryWords[i]) return false;
                }
                return elWords[currentN - 1].startsWith(currentQueryWords[currentN - 1]);
            });
    
            if (startsWithWord.length > 0) {
                results = startsWithWord;
                break; 
            }
        }
    
        if (results.length > 0) {
            return results.sort().slice(0, 7);
        }
    
        const containsQuery = vacBaseChunck.filter((el) => {
            const elWords = el.toLowerCase().split(/\s+/);
            return elWords.some((word, index) => {
                if (index + N > elWords.length) return false;
                for (let i = 0; i < N - 1; i++) {
                    if (elWords[index + i] !== queryWords[i]) return false;
                }
                return elWords[index + N - 1].startsWith(queryWords[N - 1]);
            });
        });
    
        return containsQuery.sort().slice(0, 7);
    };
// const dinListV = () => {
//     if (!vacancyQuery || !vacBaseChunck) return [];
//     const queryWords = vacancyQuery.toLowerCase().split(/\s+/);
//     const N = queryWords.length;

//     return vacBaseChunck.filter((el) => {
//         const elWords = el.toLowerCase().split(/\s+/);
//         if (elWords.length < N) return false;
//         for (let i = 0; i < N - 1; i++) {
//             if (elWords[i] !== queryWords[i]) return false;
//         }
//         return elWords[N - 1].startsWith(queryWords[N - 1]);
//     }).sort().slice(0, 7);
// };

    
    const inputOnBlur = () => {
        setTimeout(() => {
            if (!selectValue) {
                setNewItem(prev => ({...prev, vacancy: ''}));
            }
            setShowVacancyList(false);
            setSelectedIndex(0);
        }, 200);
    };
    
    return (
        <>
        <div className="itemAdd">
            <input required placeholder={pHolder} 
                name="vacancy" 
                type="text" 
                className="modalInputAd short" 
                autoComplete="off"
                value={selectValue}
                ref={inputVacancyRef} 
                onChange={(e) => {
                    getDataItems(e, {
                        setSelectValue: setSelectValue,
                        setQuery: setVacancyQuery,
                        setShowList: setShowVacancyList,
                        validate: true  
                    })
                }}
                onKeyDown={(e) => arrowPress(e, {
                    list: dinListV(),
                    setValue: setSelectValue,
                    updateItem: (field, value) => setNewItem(prev => ({...prev, [field]: value})),
                        hideList: () => setShowVacancyList(false)
                })}
                onBlur={inputOnBlur}
            />
            {selectValue&&<button className="resetSearch txtVac" onClick={(e) => resetInput(e, {
                setSelectValue: setSelectValue,
                resetFields: ["vacancy"],
                hideList: setShowVacancyList,
                setNewItem: setNewItem,
            })}>
                <span><IoClose className="resetSearchIcon" /></span>
            </button>}
        </div>
        <div>
        {showVacancyList&&<VacancySelect 
        dinList={dinListV()}
        selectedIndex={selectedIndex}
        setSelectValue={setSelectValue}
        setNewItem={setNewItem}
        />} 
    </div>
    </>
    )
}
export default VacancyInput