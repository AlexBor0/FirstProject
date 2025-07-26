import CityInput from "./CityInput";
import { useInputArrowPress } from "./useInputArrowPress";

const WeatherForm = ({gettingWeather, formRef, buttonsTitle, citiesBase, getDataItems, infoWeather, setInfo}) => {
    const { selectedIndex, setSelectedIndex, arrowPress, resetSelection } = useInputArrowPress();


        const sendForm = (e) => {
            if (infoWeather.city) {
                e.preventDefault();
                gettingWeather(infoWeather.city);
            }      
        }

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
     
    return(
        <div className="weatherForm">
            <form id="weatherForm" ref={formRef} onSubmit={sendForm}>
                <CityInput 
                    citiesBase={citiesBase} 
                    arrowPress={arrowPress}
                    getDataItems={getDataItems}
                    resetInput={resetInput}
                    setNewItem={setInfo}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    pHolder={"Місто"}
                    newDoc={infoWeather}
                    btnColor={"rgb(255, 254, 231)"}
                />
                 <button className="btnGetWeather">{buttonsTitle}</button>
            </form>
        </div>
    )
}
export default WeatherForm