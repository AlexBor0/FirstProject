import React, {useState, useRef} from "react";
import UploadFile from "./UploadFile";
import UploadFileInfo from "./UploadFileInfo";
import ItemSelect from "./ItemSelect";
// import { IoClose } from "react-icons/io5";
import CityInput from "./CityInput";
import VacancyInput from "./VacancyInput";



const AddResumeForm = ({ newCandidate, setNewCandidate, vacArr, inputErrors, citiesBase, arrowPress, selectedIndex, setSelectedIndex, resetInput, getDataItems, setPreview, specialtiesBase }) => {

const [selectVacValue, setSelectVacValue] = useState(''),
      [showVacancyList, setShowVacancyList] = useState(false),
      [fileSize, setFileSize] = useState(''),
      vacHolder = "Наіменування вакансії*",
      pHolder = "Місто, де шукаєте роботу";
const [selectValue, setSelectValue] = useState('');

const vacBaseChunck = specialtiesBase.map((el) => el.position).flat();


// const getPositions = (arr) => {
//     const vbc = [];
//     for(const el of arr) {
//         for(const i of el)
//         vbc.push(i);
//     }
//     return vbc;
// };
// const vacBaseChunck = getPositions(arrBaseChunck);

console.log(vacBaseChunck);
const inputVacancyRef = useRef(null),
      inputFileRef = useRef(null);

const getImage = (e) => {
    const file = e.target.files[0];
    if(file) {
        if ( file.size > 120 * 1024 ) {
        e.target.setCustomValidity('Розмір файла не повинен перевищувати 120 кВ');
        return;
       } else {
        setNewCandidate(prev => ({...prev, foto: file}));
        setFileSize( (file.size / 1024).toFixed(1));
        e.target.setCustomValidity('');
    } }   
};

const deleteImage = (e) => {
    if (e) {
        e.preventDefault();
    }
    setNewCandidate(prev => ({...prev, foto: null}));
        setFileSize('');
    if (inputFileRef.current) {
        inputFileRef.current.value = '';
    }
};
   
const inputOnBlur = () => {
    setTimeout(() => {
            setShowVacancyList(false);
    }, 200);
};   
 
    let dinListV = vacArr.filter((el) => {
        const words = el.toLowerCase().split(/\s+/);
        const searchLetters = newCandidate.vacancy.toLowerCase();  
        return words.some(word => word.startsWith(searchLetters));
    });
    
   
    const lookAtPreviw = (e) => {
        e.preventDefault();
        setPreview(true);
    };

        let wl = newCandidate.resume.length;

    return(
        <>
            <form onSubmit = {lookAtPreviw} id="addResumeForm">
                <h3 className="modalTitle">Швидке розміщення резюме</h3>
                <p>Для розміщення резюме заповніть форму, та натисніть "Розмістити"</p>
                <input  autoFocus={true} 
                        required placeholder="Iм'я *" 
                        minLength="3" 
                        maxLength="30" 
                        name="firstName" 
                        type="text" 
                        className="modalInputAd short" 
                        onChange={(e) => getDataItems(e, { setNewDoc: setNewCandidate, validate: true })}

                />
                
                <input required placeholder="Прізвище *"  minLength="3" maxLength="30" name="lastName" type="text" className="modalInputAd short" 
                        onChange={(e) => getDataItems(e, { setNewDoc: setNewCandidate, validate: true })}
                />
                <input required placeholder="Email *" name="email" minLength="6" maxLength="30" type="email" className="modalInputAd short"  
                        onChange={(e) => getDataItems(e, { setNewDoc: setNewCandidate, validate: true })}
                />

            <VacancyInput
                vacBaseChunck={vacBaseChunck}
                pHolder = {vacHolder}
                arrowPress={arrowPress}
                getDataItems={getDataItems}
                resetInput={resetInput}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                setNewItem={setNewCandidate}
                selectValue={selectValue}
                setSelectValue={setSelectValue}
            />
                {/* <div className="vacancyAdd">
                    <input value={selectVacValue} required placeholder="Посада, яку шукаєте*"autoComplete="off" minLength="3" maxLength="30" name="vacancy" type="text" className="modalInputAd short" 
                        ref={inputVacancyRef}
                        onChange={(e) => getDataItems(e, {
                            setNewDoc: setNewCandidate,
                            setSelectValue: setSelectVacValue,
                            setShowList: setShowVacancyList
                        })}
                        onKeyDown={(e) => arrowPress(e, {
                            list: dinListV,
                            setValue: setSelectVacValue,
                            updateItem: (field, value) => setNewCandidate(prev => ({...prev, [field]: value})),
                            hideList: () => setShowVacancyList(false)
                        })}
                        onBlur={inputOnBlur}
                    />
                        {selectVacValue&&<button className="resetSearch" onClick={(e) => resetInput(e, {
                            setSelectValue: setSelectVacValue,
                            resetFields: ["vacancy"],
                            hideList: setShowVacancyList,
                            setNewItem: setNewCandidate,
                        })}>
                                        <span><IoClose className="resetSearchIcon" /></span>
                                    </button>}
                </div> */}

                {/* <div>
                    {showVacancyList&&<ItemSelect 
                    dinList={dinListV}
                    selectedIndex={selectedIndex}
                    setSelectValue={setSelectVacValue}
                    newCandidate={newCandidate}
                    setNewCandidate={setNewCandidate}
                    />} 
                </div> */}

                <CityInput 
                    pHolder={pHolder}
                    citiesBase={citiesBase} 
                    arrowPress={arrowPress}
                    getDataItems={getDataItems}
                    resetInput={resetInput}
                    setNewItem={setNewCandidate}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    setNewCandidate={setNewCandidate}
                />

                {(inputErrors.firstName||inputErrors.lastName)&& <p style={{ color: 'red' }}>{inputErrors.firstName||inputErrors.lastName}</p>}
                <UploadFile 
                    getImage={getImage}
                    inputFileRef={inputFileRef}
                />
                {newCandidate.foto&&<UploadFileInfo 
                    newCandidate={newCandidate} 
                    fileSize={fileSize}
                    deleteImage={deleteImage}
                    hasFile={!!newCandidate.foto}
                    />}
          
                <textarea required placeholder="Коротке резюме*  (інформація, якою ви можете зацікавити работодавця)" name="resume" type="text" minLength="100" maxLength="800" className="modalInputAd txtArea" rows="10"
                    onChange={(e) => getDataItems(e, { setNewDoc: setNewCandidate, validate: true })}
                />
               
                <p>Розмір резюме має бути від 100 до 800 символів. 
                    <span style={{color: wl<100?'orange': 'green'}}>{wl>0&&' Зараз ' + wl}</span>
                </p>
                <button className="btnAddRes">ПЕРЕГЛЯД ТА РОЗМІЩЕННЯ</button>
                <p>*- поля обов'язкові для заповнення</p>
            </form>
        </>
    )
}

export default AddResumeForm