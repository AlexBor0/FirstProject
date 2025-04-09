import React, {useState, useRef} from "react";
import UploadFile from "./UploadFile";
import UploadFileInfo from "./UploadFileInfo";
import CityInput from "./CityInput";
import VacancyInput from "./VacancyInput";


const AddResumeForm = ({ newCandidate, setNewCandidate, inputErrors, citiesBase, arrowPress, selectedIndex, setSelectedIndex, resetInput, getDataItems, setPreview, specialtiesBase, setClassModal, setIsPreviewVisible}) => {

    const [selectValue, setSelectValue] = useState(newCandidate.vacancy || ''),
          [fileSize, setFileSize] = useState(''),
          vacHolder = "Наіменування вакансії*",
          pHolder = "Місто, де шукаєте роботу";


const vacBaseChunck = specialtiesBase.map((el) => el.position).flat();


// const getPositions = (arr) => {
//     const vbc = [];
//     for(const el of arr) 
//         for(const i of el)
//         vbc.push(i);
//     }
//     return vbc;
// };
// const vacBaseChunck = getPositions(arrBaseChunck);

const inputFileRef = useRef(null);

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
   
    const lookAtPreviw = (e) => {
        e.preventDefault();
        setClassModal("modalAddDoc");
        setPreview(true);
        setIsPreviewVisible(true);
    };

        let wl = newCandidate.resume.length;

    return(
        <>
            <form onSubmit = {lookAtPreviw} id="addResumeForm">
                <h3 className="modalTitle">Швидке розміщення резюме</h3>
                <p>Для розміщення резюме заповніть форму, та натисніть "Розмістити"</p>
                <input  
                    autoFocus={true} 
                    required placeholder="Iм'я *" 
                    minLength="3" 
                    maxLength="30" 
                    name="firstName" 
                    type="text" 
                    className="modalInputAd short" 
                    value={newCandidate.firstName}
                    onChange={(e) => getDataItems(e, { setNewDoc: setNewCandidate, validate: true })}
                />
                
                <input 
                    required placeholder="Прізвище *"  
                    minLength="3" 
                    maxLength="30" 
                    name="lastName" 
                    type="text" 
                    className="modalInputAd short"
                    value={newCandidate.lastName}
                    onChange={(e) => getDataItems(e, { setNewDoc: setNewCandidate, validate: true })}
                />
                <input 
                    required placeholder="Email *" 
                    name="email" minLength="6" 
                    maxLength="30" 
                    type="email" 
                    className="modalInputAd short"
                    value={newCandidate.email}  
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
                    newDoc={newCandidate}
                />

                {(inputErrors.firstName || inputErrors.lastName) && (
                    <p style={{ color: 'red' }}>{inputErrors.firstName||inputErrors.lastName}</p>
                )}
                <UploadFile 
                    getImage={getImage}
                    inputFileRef={inputFileRef}
                />
                {newCandidate.foto && ( 
                    <UploadFileInfo 
                        newCandidate={newCandidate} 
                        fileSize={fileSize}
                        deleteImage={deleteImage}
                        hasFile={!!newCandidate.foto}
                    />
                )}
          
                <textarea 
                    required placeholder="Коротке резюме*  (інформація, якою ви можете зацікавити работодавця)" 
                    name="resume" 
                    type="text" 
                    minLength="100" 
                    maxLength="800" 
                    className="modalInputAd txtArea" 
                    rows="10"
                    value={newCandidate.resume}
                    onChange={(e) => getDataItems(e, { setNewDoc: setNewCandidate, validate: true })}
                />
               
                <p>Розмір резюме має бути від 100 до 800 символів. 
                    <span style={{color: wl < 100 ? 'orange' : 'green'}}>{wl > 0 && ' Зараз ' +  wl}</span>
                </p>
                <button className="btnAddRes">ПЕРЕГЛЯД ТА РОЗМІЩЕННЯ</button>
                <p>*- поля обов'язкові для заповнення</p>
            </form>
        </>
    );
}

export default AddResumeForm