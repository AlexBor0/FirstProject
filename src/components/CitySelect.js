import {useState} from "react";
import './../css/CitySelect.css';


const CitySelect = ({ setSelectValue, dinList, selectedIndex, setNewItem}) => {
    
    const regLatToKyrArr = {"VIN": "Вінницька", "VOL": "Волинська", "DNP": "Дніпропетровська", "DON": "Донецька", "ZHYT": "Житомирська", "ZAK": "Закарпатська"
        , "ZAP": "Запорізька", "I-F": "Івано-Франківська", "KYI": "Київська", "KIR": "Кіровоградська", "LUG": "Луганська", "LVI": "Львівська", "MYK": "Миколаївська"
        , "ODE": "Одеська", "POL": "Полтавська", "RIV": "Рівненська", "SUM": "Сумська", "TER": "Тернопільська", "KHR": "Харківська", "KHS": "Херсонська"
        , "KHM": "Хмельницька", "CHK": "Черкаська", "CHN": "Чернігівська", "CHV": "Чернівецька"
    };
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const keyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const setFocus = (e) => {
    setSelectValue(e.target.value);
    };

    const mouseOver = (index) => {
        setHoveredIndex(index);
    };

    const mouseLeave = () => {
        setHoveredIndex(null);
    };
    const replaceRegion = (re) => {
        const result = regLatToKyrArr[re] || null;
        return result;
    };


    return dinList.length > 0 && (
        <div className="vacCitySelect">
            <ul className="cityList" >
                {dinList.map((el, index)=> (
                    <li key={`${el.cN}-${el.re}-${index}`}>
                        <button style={{backgroundColor:selectedIndex === index ?' rgb(232, 240, 254)': 'transparent' }}
                            className={`${hoveredIndex === index ? 'hovered' : ''} ${hoveredIndex !== null && hoveredIndex !== index ? 'otherNonHovered' : ''}`}
                            onClick={(e) =>{
                                e.preventDefault();
                                setNewItem(prev => ({ ...prev, city: el.cN }));
                                setNewItem(prev => ({ ...prev, region: replaceRegion(el.re) }));
                                setSelectValue(el.cN);
                            }
                                
                            }      
                            onFocus={setFocus} 
                            onKeyDown={keyPress}
                            value= {el}
                            onMouseEnter={() => mouseOver(index)}
                            onMouseLeave={mouseLeave}>
                            <div className="btnText">{el.cN} ({el.re})
                            </div>
                        </button>
                    </li>))
                }
           </ul>
        </div>
    )
}
export default CitySelect