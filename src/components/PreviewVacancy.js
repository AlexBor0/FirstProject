import React from "react";
import VacancyCard from "./VacancyCard";

const PreviewVacancy = ({post, edit, previewContentRef, vacancy, requirements, editable, setShowDoc, setShowConfirmModal, setShowDocList, setShowProfileBook, currentUser, host}) => {

    const onClose = () => {
        setShowDoc(false); 
        setShowConfirmModal(false);
        setShowDocList(true);
        setShowProfileBook(true);
    };
    
    return (
        <>
            <div className={editable?"previewModal":"viewModal"} >
                <div className="previewContainer">
                    <h3 className="previewH3">{editable? "Прев'ю ": "Перегляд "}вакансії</h3>
                    {editable&& (
                        <div className="previewHeader"> 
                            <button className="btnEdit" 
                                onClick={() => {
                                    edit();
                                }}
                                autoFocus={true}
                            >Редагувати
                            </button>
                            <button 
                            className="btnPublish"
                            onClick={post}
                            >
                                Опублікувати
                            </button>
                            
                        </div>
                    )}
                    <div className="previewContent" ref={previewContentRef}>

                        <VacancyCard	 
                            vacancy={vacancy}
                            onClose={onClose}
                            editable={editable}
                            requirements={requirements}
                            currentUser={currentUser}
                            host={host}
                        />

                    </div>
                </div>
            </div>
        </>
    )
}
export default PreviewVacancy