import React, { useState }  from "react";

const ConfirmModal = ({setShowConfirmModal, indexDoc, currentUser, setShowDocList}) => {

    return(
        <div className="modalConfirm">
            <p>Бажаєте видалити резюме <b>{currentUser.userDocs[indexDoc].title}</b> ? </p>
            
            <div className="wrapBtns">
                <button onClick={(e) => { e.preventDefault(); setShowConfirmModal(false);setShowDocList(true) }}>
                    НІ
                </button>
                <button onClick={(e) => {e.preventDefault();}}>
                    ТАК
                </button>
            </div>
        </div>
    )
};
export default ConfirmModal