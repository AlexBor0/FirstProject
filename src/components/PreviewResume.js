import React from "react";
import GestAva from "./../img/GestAva.png";
import { IoCloseCircleSharp } from "react-icons/io5";
import './../css/Preview.css';

const PreviewResume = ({post, edit, previewContentRef, candidate, editable, host, setShowDoc, setShowConfirmModal, setShowDocList }) => {
    
    const imageSrc = editable
        ? 
            (candidate.foto instanceof File 
                ? URL.createObjectURL(candidate.foto) 
                : GestAva) 
        :   (candidate?.foto?.url 
                ? `${host}${candidate.foto.url}` 
                : GestAva);
   
    return (
        <>
                <div className={editable?"previewModal":"viewModal"} >
                     {!editable&&<button autoFocus={true}
                        onClick = {() => {
                            setShowDoc(false); 
                            setShowConfirmModal(false);
                            setShowDocList(true);
                        }}><IoCloseCircleSharp className="delete-icon" 
                     /></button>}
            <h3 className="previewH3">{editable? "Прев'ю ": "Перегляд "}резюме</h3>
            {editable&&<div className="previewHeader"> 
               <button className="btnEdit" 
                    onClick={edit}
                    autoFocus={true}
                >Редагувати
                </button>
                <button className="btnPublish"
                   onClick={post}
                >
                    Опублікувати
                </button>
                
            </div>}
                <div className="previewContent" ref={previewContentRef}>
                <div className="card candidate new" >
            <p>Претендент на вакансію: <strong>{editable ? candidate.vacancy : candidate.title}</strong>
             {" у місті: "}{candidate.city}{" ("}{candidate.region}{" обл.)"} </p>
            <img src={imageSrc} alt={candidate.foto?"Фото кандидата" : "Фото за замовчуванням"}  width="100px" height="100px" />
            
            <h3>{candidate.firstName} {candidate.lastName}</h3>
            <p>{candidate.email}</p>
            <p>{candidate.resume}</p>
        </div>
                </div>
        </div>
        </>
    )
}
export default PreviewResume