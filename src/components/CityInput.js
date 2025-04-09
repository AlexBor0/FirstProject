import React, {useState, useRef, useEffect} from "react";
import { IoClose } from "react-icons/io5";
import CitySelect from "./CitySelect";


const CityInput = ({citiesBase, arrowPress, getDataItems, resetInput, setNewItem, selectedIndex, setSelectedIndex, pHolder, newDoc}) => {

    const [cityQuery, setCityQuery] = useState(''),
          [showCityList, setShowCityList] = useState(false),
          [selectCityValue, setSelectCityValue] = useState('');
    const inputCityRef = useRef(null);

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
          const handler = setTimeout(() => setDebouncedValue(value), delay);

          return () => clearTimeout(handler);

    }, [value, delay]);

    return debouncedValue;
};
const debouncedCityQuery = useDebounce(cityQuery, 400);

    const dinListC = React.useMemo(() => {
        if (!debouncedCityQuery || !citiesBase) return [];

        const searchLetters = debouncedCityQuery.toLowerCase();

        return citiesBase
        .filter(el => el.cN.toLowerCase().startsWith(searchLetters))
        .slice(0, 5);
    }, [debouncedCityQuery, citiesBase]);

    const inputOnBlur = () => {
        setTimeout(() => {
                setShowCityList(false);
                setSelectedIndex(0);
        }, 200);
    };
    
    return (
        <>
        <div className="itemAdd">
            <input 
                required placeholder={pHolder} 
                name="city" 
                type="text" 
                className="modalInputAd" 
                autoComplete="off"
                value={selectCityValue || newDoc.city}
                ref={inputCityRef} 
                onChange={(e) => getDataItems(e, {
                    setSelectValue: setSelectCityValue,
                    setQuery: setCityQuery,
                    setShowList: setShowCityList
                })}
                onKeyDown={(e) => arrowPress(e, {
                    list: dinListC,
                    setValue: setSelectCityValue,
                    updateItem: (field, value) => setNewItem(prev => ({...prev, [field]: value})),
                        hideList: () => setShowCityList(false)
                })}
                onBlur={inputOnBlur}
            />
            {selectCityValue&&<button className="resetSearch" onClick={(e) => resetInput(e, {
                setSelectValue: setSelectCityValue,
                resetFields: ["city", "region"],
                hideList: setShowCityList,
                setNewItem: setNewItem,
            })}>
                <span><IoClose className="resetSearchIcon" /></span>
            </button>}
        </div>
        <div>
        {showCityList&&<CitySelect 
        dinList={dinListC}
        selectedIndex={selectedIndex}
        setSelectValue={setSelectCityValue}
        setNewItem={setNewItem}
        />} 
    </div>
    </>
    )
}
export default CityInput