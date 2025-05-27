/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useRef} from "react";

import TextEditor from "./TextEditor";
import CityInput from "./CityInput";
import VacancyDepInput from "./VacancyDepInput";
import VacancyInput from "./VacancyInput";

const AddVacancyForm = ({ 
  newVacancy,
  setNewVacancy,
  citiesBase,
  arrowPress,
  selectedIndex,
  setSelectedIndex,
  resetInput,
  getDataItems,
  specialtiesBase,
  saveTextEditor,
  setSaveTextEditor,
  modalContRef,
  setIsPreviewVisible,
  setSavingEditorContent,
  savingEditorContent,
  currentUser 
}) => {

const pHolder = "Місто, де пропонується робота",
      vacHolder = "Наіменування вакансії*"; 
const depart = newVacancy.department;
const vacBaseChunck = depart && specialtiesBase.find(el => el.category === depart )?.position;

const [selectValue, setSelectValue] = useState(newVacancy.vacancy ||''),
      [editorLetters, setEditorLetters] = useState(null),
      [validationError, setValidationError] = useState(""),
      [isSubmitting, setIsSubmitting] = useState(false),
      [keepEitor, setKeepEitor] = useState(null);;

const formRef = useRef(null);
const prevElementTopRef = useRef(null);
const textEditorRef = useRef(null);
const check = newVacancy.employment;


useEffect(() => { //Перемещение фокуса по модальному окну
  const handleTabNavigation = (e) => {
    if (e.key === 'Tab') {
      const modalCont = modalContRef.current;
      const currentActive = document.activeElement;
      const isInEditor = currentActive.closest('.editor');

      setTimeout(() => {
        const newActive = document.activeElement;
        
        if (!modalCont || !currentActive || !newActive) return;

        const isToButton = newActive.classList.contains('btnAddRes');
        
        if (isToButton) {
          const contentHeight = modalCont.scrollHeight;
          const modalHeight = modalCont.getBoundingClientRect().height;         
          modalCont.scrollTo({
            top: contentHeight - modalHeight,
            behavior: 'smooth'
          });
        } 
        else if (!isInEditor) {
          const modalRect = modalCont.getBoundingClientRect();
          const elementRect = newActive.getBoundingClientRect();
          const modalHeight = modalRect.height;
          const elementTopRelative = elementRect.top - modalRect.top;
          const prevElementTop = prevElementTopRef.current;

          if (elementTopRelative > modalHeight / 2) {
            if (!prevElementTop || elementTopRelative > prevElementTop + 50) {
              let scrollTarget = elementTopRelative - (modalHeight / 2) + elementRect.height / 2;
  
              modalCont.scrollTo({
                top: scrollTarget,
                behavior: 'smooth'
              });
            }
          }
          prevElementTopRef.current = elementTopRelative;
        }
      }, 0);
    }
  };

  const formElement = formRef.current;
  
  if (formElement) {
    formElement.addEventListener('keydown', handleTabNavigation);
    document.addEventListener('keydown', handleTabNavigation);
    
    return () => {
      formElement.removeEventListener('keydown', handleTabNavigation);
      document.removeEventListener('keydown', handleTabNavigation);
    };
  }
}, []);

  useEffect(() => { //Блокировка Ентер в форме
    const formElement = formRef.current;
    
    const handleFormKeyPress = (e) => {
      if (e.key === 'Enter' &&
          e.target.type !== 'textarea' &&
          !e.target.classList.contains('resetSearch') &&
          !e.target.classList.contains('btnAddRes')) {
        e.preventDefault();
      }
    };

    if (formElement) {
      formElement.addEventListener('keypress', handleFormKeyPress);
      return () => formElement.removeEventListener('keypress', handleFormKeyPress);
    }
  }, []);

useEffect(() => { //Установка значений по умолчанию 
    setNewVacancy(prev => ({
      ...prev,
      employment: prev.employment || "повна",
      workSchedule: prev.workSchedule || "тижневий",
      workFormat: prev.workFormat || "очна робота",
      company: prev.company || currentUser?.company?.companyName,
    }));
  }, []);

let vl = newVacancy.description.length;

const validSubmit = (e) => {
    e.preventDefault();

    if (editorLetters > 600) {
        setValidationError("Кількість символів у вимогах до кандидата не повинна перевищувати 600!");
        return; 
      };
      setValidationError("");
      if (keepEitor) {
        setSavingEditorContent(keepEitor.getJSON()); 
    }
      setIsSubmitting(true);
      setSaveTextEditor(true);
    };

    useEffect(() => { //Проверка на наличие текста в редакторе
      if (isSubmitting && newVacancy.requirements && newVacancy.requirements.length > 0) {
        setIsSubmitting(false);
        setIsPreviewVisible(true);
      }
    }, [isSubmitting, newVacancy.requirements]);  

const changeRadio = (e) => {
    if (e.target.type === 'radio') {
        getDataItems(e, { setNewDoc: setNewVacancy });
    }
  }

    return(
        <>
        <form id="addVacancyForm" 
            ref={formRef}
            onSubmit={validSubmit}>
            <h3 className="modalTitle">Розміщення вакансії</h3>
            <p>Для розміщення вакансії заповніть форму</p>
            <VacancyDepInput
              specialtiesBase={specialtiesBase}
              arrowPress={arrowPress}
              getDataItems={getDataItems}
              resetInput={resetInput}
              setNewVacancy={setNewVacancy}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              setSelectVacancyValue={setSelectValue}
              newVacancy={newVacancy}
            />
            <input 
              required 
              // placeholder={currentUser?.company?.companyName ||"Назва компанії" }
              name="company" 
              minLength="3" 
              maxLength="25"
              type="text" 
              className="modalInputAd short"
              value={currentUser?.company?.companyName} 
              onChange={(e) => getDataItems(e, { setNewDoc: setNewVacancy })}
            />
            <VacancyInput
              vacBaseChunck={vacBaseChunck}
              pHolder = {vacHolder}
              arrowPress={arrowPress}
              getDataItems={getDataItems}
              resetInput={resetInput}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              setNewItem={setNewVacancy}
              selectValue={selectValue}
              setSelectValue={setSelectValue}
            />

            <div className="optionsFild">
            <fieldset className="workOptions" onChange={changeRadio} >
                <legend>Форма зайнятості:</legend>
                    <div>
                        <input  id="full" name="employment" type="radio" value="повна" className="radioInput" checked={check === "повна"} onChange={changeRadio} />
                        <label htmlFor="full">Повна зайнятість</label>
                    </div>
                    <div>
                        <input  id="under" name="employment" type="radio" value="неповна" className="radioInput" checked={check === "неповна"} onChange={changeRadio} />
                        <label htmlFor="under">Неповна зайнятість</label>
                    </div>
                    <div>
                        <input  id="partTime" name="employment" type="radio" value="часткова" className="radioInput"  checked={check === "часткова"} onChange={changeRadio} />
                        <label htmlFor="partTime">Часткова зайнятість</label>
                    </div>
                    <div>
                        <input  id="temporary" name="employment" type="radio" value="тимчасова" className="radioInput" checked={check === "тимчасова"} onChange={changeRadio} />
                        <label htmlFor="temporary">Тимчасова робота</label>
                    </div>
            </fieldset>
            <fieldset className="workOptions" onChange={changeRadio} >
                <legend>Графік роботи:</legend>
                    <div>
                        <input  id="workWeek" name="workSchedule" type="radio" value="тижневий" className="radioInput" checked={newVacancy.workSchedule === "тижневий"} onChange={changeRadio}/>
                        <label htmlFor="workWeek">Тижневий графік</label>
                    </div>
                    <div>
                        <input  id="shiftWork" name="workSchedule" type="radio" value="змінний" className="radioInput" checked={newVacancy.workSchedule === "змінний"} onChange={changeRadio}/>
                        <label htmlFor="shiftWork">Змінний графік</label>
                    </div>
                    <div>
                        <input  id="flexibleWork" name="workSchedule" type="radio" value="гнучкий" className="radioInput" checked={newVacancy.workSchedule === "гнучкий"} onChange={changeRadio}/>
                        <label htmlFor="flexibleWork">Гнучкий графік</label>
                    </div>
                    <div>
                        <input  id="longShiftWork" name="workSchedule" type="radio" value="вахтовий" className="radioInput" checked={newVacancy.workSchedule === "вахтовий"} onChange={changeRadio}/>
                        <label htmlFor="longShiftWork">Вахтовий метод</label>
                    </div>
            </fieldset>
            <fieldset className="workOptions format" onChange={changeRadio} >
                <legend>Формат роботи:</legend>
                    <div>
                        <input  id="faceWork" name="workFormat" type="radio" value="очна робота" className="radioInput" checked={newVacancy.workFormat === "очна робота"} onChange={changeRadio}/>
                        <label htmlFor="faceWork">Очна робота</label>
                    </div>
                    <div>
                        <input  id="hybridWork" name="workFormat" type="radio" value="гібридний формат" className="radioInput" checked={newVacancy.workFormat === "гібридний формат"} onChange={changeRadio}/>
                        <label htmlFor="hybridWork">Гібридний формат</label>
                    </div>
                    <div>
                        <input  id="remote" name="workFormat" type="radio" value="дистанційна" className="radioInput" checked={newVacancy.workFormat === "дистанційна"} onChange={changeRadio}/>
                        <label htmlFor="remote">Дистанційна</label>
                    </div>
                    <div>
                        <input  id="outsourcing" name="workFormat" type="radio" value="аутсорс" className="radioInput" checked={newVacancy.workFormat === "аутсорс"} onChange={changeRadio}/>
                        <label htmlFor="outsourcing">Аутсорс</label>
                    </div>
                    <div>
                        <input  id="projectWork" name="workFormat" type="radio" value="проектна робота" className="radioInput" checked={newVacancy.workFormat === "проектна робота"} onChange={changeRadio}/>
                        <label htmlFor="projectWork">Проектна робота</label>
                    </div>
                    <div>
                        <input  id="freelance" name="workFormat" type="radio" value="фріланс" className="radioInput" checked={newVacancy.workFormat === "фріланс"} onChange={changeRadio}/>
                        <label htmlFor="freelance">Фріланс</label>
                    </div>
            </fieldset>
            </div>
            <input 
              required 
              placeholder="Розмір зарплати*, грн" 
              name="salary" min="0" max="500000" 
              step="500" 
              type="number" 
              className="modalInputAd short" 
              value={newVacancy.salary}
              onChange={(e) => getDataItems(e, { setNewDoc: setNewVacancy })}
            />
            <input 
              required 
              placeholder="Досвід роботи*, років" 
              name="experience" 
              min="0"
              max="50" 
              step="0.5" 
              type="number" 
              className="modalInputAd short"
              value={newVacancy.experience} 
              onChange={(e) => getDataItems(e, { setNewDoc: setNewVacancy })}
            />
            
            <CityInput 
              citiesBase={citiesBase} 
              arrowPress={arrowPress}
              getDataItems={getDataItems}
              resetInput={resetInput}
              setNewItem={setNewVacancy}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              pHolder={pHolder}
              newDoc={newVacancy}
            />
            <p>Опис вакансії має бути від 100 до 600 символів.</p>
            <p>Вимоги до кандидата не більше 600.</p>  
            <textarea 
                required
                placeholder="Опис вакансії*"
                name="description" 
                type="text" 
                minLength="100" 
                maxLength="600" 
                className="modalInputAd txtArea" 
                rows="10" 
                cols="62"
                value={newVacancy.description}
                onChange={(e) => getDataItems(e, { setNewDoc: setNewVacancy })}
            />
            <span className="lettering" style={{color: vl<100?'orange': 'green'}}>
                {vl>0&&'Кількість символів в опису вакансії: ' + vl + '. '}
            </span> 
            <span className="lettering" style={{color: editorLetters<100 || editorLetters > 600 ?'orange': 'green'}}>   
                {editorLetters>0&&' У вимогах до кандидату: ' + editorLetters}
            </span>

            <h4>Вимоги до кандидата:</h4>
            <div ref={textEditorRef}>
                <TextEditor 
                    setNewVacancy={setNewVacancy}
                    saveTextEditor={saveTextEditor}
                    setEditorLetters={setEditorLetters}
                    setKeepEitor={setKeepEitor}
                    savingEditorContent={savingEditorContent}
                />
            </div>
            {validationError && editorLetters > 600 && <p style={{ color: "red" }}>{validationError}</p>}
            <button className="btnAddRes">ПЕРЕГЛЯД ТА РОЗМІЩЕННЯ</button>
            <p>*- поля обов'язкові для заповнення</p>
        </form>
        
        </>
    )
}

export default AddVacancyForm