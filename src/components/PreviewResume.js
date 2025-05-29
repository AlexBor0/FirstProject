import React from "react";
import GestAva from "./../img/GestAva.png";
import './../css/Preview.css';
import ResumeCard from "./ResumeCard";

const PreviewResume = ( {
    post,
    edit,
    previewContentRef,
    candidate,
    editable,
    host,
    setShowDoc,
    setShowConfirmModal,
    setShowDocList,
    setShowProfileBook
} ) => {
    
    const imageSrc = editable
        ? 
            (candidate.foto instanceof File 
                ? URL.createObjectURL(candidate.foto) 
                : GestAva) 
        :   (candidate?.foto?.url 
                ? `${host}${candidate.foto.url}` 
                : GestAva);

    const onClose = () => {
        setShowDoc(false); 
        setShowConfirmModal(false);
        setShowDocList(true);
        setShowProfileBook(true);
    };

    const vacancyTitle = editable ? candidate.vacancy : candidate.title;
   
    return (
        <>
            <div className={editable?"previewModal":"viewModal"} >
                <div className="previewContainer">
                
                    <h3 className="previewH3">{editable? "Прев'ю ": "Перегляд "}резюме</h3>
                    {editable&& (
                        <div className="previewHeader"> 
                            <button className="btnEdit" 
                                onClick={() => {
                                    edit();

                                }}
                                autoFocus={true}
                            >
                                Редагувати
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

                        <ResumeCard
                            candidate={candidate}
                            onClose={onClose}
                            vacancyTitle={vacancyTitle}
                            imageSrc={imageSrc}
                            editable={editable}
                        />
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default PreviewResume