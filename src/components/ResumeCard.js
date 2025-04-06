import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import './../css/Preview.css';
import './../css/ResumeCard.css';

const ResumeCard = ({candidate, onClose, vacancyTitle, imageSrc, editable}) => {

    return (
        <div className="card candidate" >
            {!editable&&
                <button autoFocus={true} onClick = {onClose}>
                    <IoCloseCircleSharp className="delete-icon"/>
                </button>
            }
            
            <img src={imageSrc} alt={candidate.foto?"Фото кандидата" : "Фото за замовчуванням"}  width="100px" height="100px" />
            <p><strong>{vacancyTitle}</strong>
                {" у місті: "}{candidate.city}{" ("}{candidate.region}{" обл.)"} 
            </p>
            <h3>{candidate.firstName} {candidate.lastName}</h3>
            <p>{candidate.email}</p>
            <p className="textResume">{candidate.resume}</p>
        </div>
    )
  }
  export default ResumeCard