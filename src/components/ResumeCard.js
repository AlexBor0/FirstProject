import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import FormatDate from './FormatDate';
import Mailto from "./Mailto";
import './../css/Preview.css';
import './../css/ResumeCard.css';

const ResumeCard = ({candidate, onClose, vacancyTitle, imageSrc, editable, parentComponent }) => {

    return (
        <article className="card candidate" >
            {!editable&&
                <button 
                autoFocus={parentComponent !== 'Candidate' && true} 
                onClick = {onClose}
                >
                    <IoCloseCircleSharp className="delete-icon"/>
                </button>
            }
            
            <img src={imageSrc} alt={candidate.foto?"Фото кандидата" : "Фото за замовчуванням"}  width="100px" height="100px" />
            <h3>{vacancyTitle}</h3>
            <p><strong>{candidate.firstName} {candidate.lastName}</strong> 
            </p> 
            <address>
                <p>{"місто: "}{candidate.city}{" ("}{candidate.region}{" обл.)"}</p>
                <Mailto
                    email={candidate.email}
                    subject="Відгук на резюме" 
                    body="Доброго дня!"
                    children={candidate.email}
                />
            </address>
            {!editable&& 
                <div className="dates">
                    <div>
                        <span>Створено:{" "}</span>
                        <br/>
                        <span>Оновлено:{" "}</span>
                    </div>
                    <div>
                        <time>
                            <FormatDate isoDate={candidate.createdAt}/>
                        </time>
                        <br/>
                        <time>
                            <FormatDate isoDate={candidate.updatedAt}/>
                        </time> 
                    </div>       
                                      
                </div>
            }
           
            <p className="textResume">{candidate.resume}</p>
        </article>
    )
  }
  export default ResumeCard