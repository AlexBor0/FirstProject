import React from "react";
import GestAva from "./../img/GestAva.png";

const PreviewResume = ({post, edit, previewContentRef, newCandidate}) => {
    
    const imageSrc = newCandidate.foto instanceof File 
    ? URL.createObjectURL(newCandidate.foto) 
    : GestAva;

   
    return (
        <>
                <div className="previewModal" >
            <h3 className="previewH4">Прев'ю резюме</h3>
            <div className="previewHeader"> 
                <button className="btnEdit" 
                    onClick={edit}
                    autoFocus={true}
                >Редагувати
                </button>
                <button className="btnPublish"
                   onClick={post}
                >Опублікувати</button>
                
            </div>
                <div className="previewContent" ref={previewContentRef}>
                <div className="card candidate new" >
            <p>Претендент на вакансію: <strong>{newCandidate.vacancy}</strong>
             {" у місті: "}{newCandidate.city}{" ("}{newCandidate.region}{" обл.)"} </p>
            <img src={imageSrc} alt={newCandidate.foto?"Фото кандидата" : "Фото за замовчуванням"}  width="100px" height="100px" />
            
            <h3>{newCandidate.firstName} {newCandidate.lastName}</h3>
            <p>{newCandidate.email}</p>
            <p>{newCandidate.resume}</p>
        </div>
                </div>
        </div>
        </>
    )
}
export default PreviewResume