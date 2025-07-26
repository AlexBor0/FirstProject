import {useState} from "react";
import './../css/VacancySelect.css';

const ItemSelect = ({ setSelectValue, dinList, selectedIndex, setNewCandidate, newCandidate}) => {

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const selectOn = (e) => {      
        e.preventDefault();
        setNewCandidate({ ...newCandidate, vacancy: e.target.firstChild.textContent });   
        setSelectValue(e.target.firstChild.textContent);
    };


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


    return dinList.length > 0 && (
        <div className="vacSelect">
            <ul className="vacList" >
                {dinList.map((el, index)=> (
                    <li key={el}>
                        <button style={{backgroundColor:selectedIndex === index ?' rgb(232, 240, 254)': 'transparent' }}
                            className={`${hoveredIndex === index ? 'hovered' : ''} ${hoveredIndex !== null && hoveredIndex !== index ? 'otherNonHovered' : ''}`}
                            onClick={selectOn}      
                            onFocus={setFocus} 
                            onKeyDown={keyPress}
                            value= {el}
                            onMouseEnter={() => mouseOver(index)}
                            onMouseLeave={mouseLeave}>
                            <div className="btnText">{el}
                            </div>
                        </button>
                    </li>))
                }
           </ul>
        </div>
    )
}
export default ItemSelect