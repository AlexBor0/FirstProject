import React, {useState, memo} from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import AauthorizationForm from "./AauthorizationForm";
import Registration from "./Registration";
import useEsc from "./useEsc";
import useNoScroll from "./useNoScroll";
import './../css/ModalEntry.css';


const ModalEntry = memo(( {
    regEntry,
    modalClass,
    toggleModal,
    confirm,
    setConfirm,
    currentUser,
    setCurrentUser,
    regUser,
    resetRegForm,
    host,
    setInputErrors,
    inputErrors,
    setRegUser,
    getDataItems,
    showProfile,
    addDoc,
    axios
} ) => {

    const [regOn, setRegOn] = useState(false);

    const setOnClick = () => {
        toggleModal();
        setRegOn(false);
        resetRegForm();
       };

       useEsc(() => {
        if (!showProfile && !addDoc) {
          setOnClick();
        }
      });  
      useNoScroll(regEntry);

// состояние regEntry отвечает за показ Модального окна

    return (regEntry&&(
        <div className={modalClass} style={{ overflow: "hidden"}} onClick = {(e) => (e.target.className === "blurRect"&&setOnClick())} >
            <div className="modalDialog">
                <div className="modalContent" >
                <IoCloseCircleSharp className="delete-icon" onClick = {() => setOnClick()} />
                {!regOn&&<AauthorizationForm 
                    host={host} 
                    confirm={confirm} 
                    setConfirm={setConfirm}
                    currentUser={currentUser} 
                    setCurrentUser={setCurrentUser}
                    setRegOn={setRegOn} 
                    regOn={regOn}
                    inputErrors={inputErrors}
                    setInputErrors={setInputErrors}
                    axios={axios}
                />}
                {regOn&&<Registration 
                    host={host} 
                    setRegOn={setRegOn} 
                    regOn={regOn} 
                    regUser={regUser} 
                    setRegUser={setRegUser}
                    inputErrors={inputErrors}
                    resetRegForm={resetRegForm}
                    getDataItems={getDataItems}
                    axios={axios}
                />}
                </div>
            </div>

        </div>)
    );
});
export default ModalEntry;