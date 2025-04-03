import React, { useState } from "react";
import PreviewResume from './PreviewResume';


const ConfirmModal = ({setShowConfirmModal, indexDoc, currentUser, setShowDocList, host, axios, setCurrentUser, typeBtn}) => {

    const [showDoc, setShowDoc] = useState(false);

    const delSuccessStatuses = [200, 202, 204];

    const action = (typeBtn === "del"? "видалити" : (typeBtn === "edit" ? "редагувати" : "переглянути"));

    const fetchDeleteDoc = async () => {

        const idDocToDel = currentUser.userDocs[indexDoc].documentId || null;

        if (idDocToDel) {
            const deleteDoc = await axios.delete(
                `${host}/api/Candidates/${idDocToDel}`,
                    {
                        headers: {
                            Authorization: `Bearer ${currentUser.userJWT}`,
                        },
                    }  
            );
    
            if (!delSuccessStatuses.includes(deleteDoc.status)) {
                throw new Error("Помилка при видаленні резюме");
            } 
            else {
                setCurrentUser(prev => ({
                    ...prev, 
                    userDocs: prev.userDocs.filter((_, idx) => idx !== indexDoc)
                }));
            };
        } else {
            console.log("Не знайдено документу для видалення")
        }
  
    };

    const fetchDeleteImgAndDoc = async () => {
       const idFotoToDel = currentUser.userDocs[indexDoc].foto.id || null; 

       if (idFotoToDel)  {
            const deleteImgDoc = await axios.delete(
                `${host}/api/upload/files/${idFotoToDel}`,
                    {
                        headers: {
                        Authorization: `Bearer ${currentUser.userJWT}`,
                        },
                    }  
            );

            if (!delSuccessStatuses.includes(deleteImgDoc.status)) {
            throw new Error("Помилка при видаленні фото");
            } else {
                fetchDeleteDoc();
              }
        } else {
            fetchDeleteDoc();
        };
    };

    const backward = (e) => {
        e.preventDefault(); 
        setShowConfirmModal(false);
        setShowDocList(true)
    };

    const deleteDocument = () => {
        fetchDeleteImgAndDoc();
        setShowConfirmModal(false);
        setShowDocList(true);
    };

    const viewDocument = () => {
        setShowDoc(true);
    };

    const editDocument = () => console.log('Редактирование документа');

    const chooseAction = (typeBtn) => {
        switch (typeBtn) {
            case "del": return deleteDocument();
            case "edit": return editDocument();
            case "view": return viewDocument();
            default: console.log("Непередбачена помилка")
        }
    };

    const btnBlok = (
            <div className="wrapBtns">
                <button onClick={backward}>
                    НІ
                </button>
                <button autoFocus={true} onClick={() => chooseAction(typeBtn)}>
                    ТАК
                </button>
            </div>);
            
    const modal= (
        <div className="modalConfirm">
            <p>Бажаєте {action} резюме <b>{currentUser.userDocs[indexDoc].title}</b> ? </p>
            {btnBlok}
        </div>
    );


    return(
        <>
            {modal}
            {showDoc&&<PreviewResume
                  candidate={currentUser.userDocs[indexDoc]}
                  indexDoc={indexDoc}
                  setShowDoc={setShowDoc}
                  editable={false}
                  host={host}
                  backward={backward}
                  setShowConfirmModal={setShowConfirmModal}
                  setShowDocList={setShowDocList}
                />}
        </>   
    )
};
export default ConfirmModal