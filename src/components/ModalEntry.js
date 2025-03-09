import React, {useEffect, useState} from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import AauthorizationForm from "./AauthorizationForm";
import Registration from "./Registration";
import useEsc from "./useEsc";
import './../css/ModalEntry.css';


const ModalEntry = ({regEntry, modalClass, toggleModal, confirm, setConfirm, currentUser, setCurrentUser, regUser, resetRegForm, host, validInput, inputErrors, setRegUser, showProfile, addDoc}) => {

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

    // useEffect(() => {
    //     const handlKeyDown = (e) => {
    //         e.key === 'Escape'&&setOnClick()
    //     }
            
    //     document.addEventListener('keydown', handlKeyDown);
      
    //     return () => {
    //       document.removeEventListener('keydown', handlKeyDown);
    //     };
    //   });

      useEffect(() => {
        if (regEntry) {document.body.style.overflow = 'hidden';}
            else { document.body.style.overflow = 'unset';};
            
        return () => {
                document.body.style.overflow = 'unset';};

    }, [regEntry] );

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
                    validInput={validInput}
                    inputErrors={inputErrors}
                />}
                {regOn&&<Registration 
                    host={host} 
                    setRegOn={setRegOn} 
                    regOn={regOn} 
                    regUser={regUser} 
                    setRegUser={setRegUser}
                    validInput={validInput}
                    inputErrors={inputErrors}
                    resetRegForm={resetRegForm}
                />}
                </div>
            </div>

        </div>)
    );
}
export default ModalEntry;