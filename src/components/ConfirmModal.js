import React, { useState }  from "react";


const ConfirmModal = ({setShowConfirmModal, indexDoc, currentUser, setShowDocList, host, axios, setCurrentUser}) => {

    const delSuccessStatuses = [200, 202, 204];


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
    }

    const deleteDocument = (e) => {
        e.preventDefault();
        fetchDeleteImgAndDoc();
        setShowConfirmModal(false);
        setShowDocList(true);
    }

    return(
        <div className="modalConfirm">
            <p>Бажаєте видалити резюме <b>{currentUser.userDocs[indexDoc].title}</b> ? </p>
            
            <div className="wrapBtns">
                <button onClick={backward}>
                    НІ
                </button>
                <button onClick={deleteDocument}>
                    ТАК
                </button>
            </div>
        </div>
    )
};
export default ConfirmModal