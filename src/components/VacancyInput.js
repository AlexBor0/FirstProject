import React, {useState, useRef} from "react";
import { IoClose } from "react-icons/io5";
import VacancySelect from "./VacancySelect";


const VacancyInput = ({ arrowPress, getDataItems, resetInput, selectedIndex, setSelectedIndex, vacBaseChunck, pHolder, setNewItem, selectValue, setSelectValue }) => {

    const [vacancyQuery, setVacancyQuery] = useState(''),
          [showVacancyList, setShowVacancyList] = useState(false);
          
    const inputVacancyRef = useRef(null);

const dinListV = () => {
    if (!vacancyQuery || !vacBaseChunck) return [];
    const searchLetters = vacancyQuery.toLowerCase();

    return vacBaseChunck.filter((el) => {
        const words = el.toLowerCase().split(/\s+/); 
        return words.some(word => word.startsWith(searchLetters));
    }).sort().slice(0, 7);
};
    
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