import { useState } from 'react';
import { IoCloseCircleSharp } from "react-icons/io5";
import FormatDate from './FormatDate';
import Mailto from "./Mailto";
import formatPhoneNumber from "./FormatePhone";
import MobileLogo from "./MobileLogo";
import PreviewResume from './PreviewResume';
import GestAva from "./../img/GestAva.png";
import './../css/Preview.css';
import './../css/ResumeCard.css';


const ResumeCard = ( {
    candidate,
    onClose,
    editable,
    preview,
    parentComponent,
    currentUser,
    host
} ) => {
    const [showFullResume, setShowFullResume] =useState(false);
    const vacancyTitle = editable ? candidate.vacancy : candidate.title;

    const imageSrc = editable
        ? 
            (candidate.foto instanceof File 
                ? URL.createObjectURL(candidate.foto) 
                : GestAva) 
        :   (candidate?.foto?.url 
                ? `${host}${candidate.foto.url}` 
                : GestAva);

    const   tel = candidate?.telephone,
            pcc = parentComponent === 'Candidate',
            pcsc = parentComponent === 'shortCard',
            formatedTel = tel ? tel.replace(/\D/g, '') : tel;
    


    return (
        <>
            <article className="card candidate" >
                {!editable&&
                    <button 
                    autoFocus={parentComponent !== 'Candidate' && true} 
                    onClick = {onClose}
                    >
                        <IoCloseCircleSharp className="delete-icon"/>
                    </button>
                }
                <header>
                {pcc
                    ?   <button 
                        onClick={() => setShowFullResume(true)}
                    >
                            {vacancyTitle }
                        </button>
                    :   <h3>{editable ? candidate.title : vacancyTitle }</h3>
                    }


                </header>
                {(pcsc || preview) && <img src={imageSrc} alt={candidate.foto?"Фото кандидата" : "Фото за замовчуванням"}  width="100px" height="100px" />}
                
                <p><strong>{candidate.firstName} {candidate.lastName}</strong> 
                </p> 
                <address>
                    <p>{"місто: "}{candidate.city}{" ("}{candidate.region}{" обл.)"}</p>
                    
                {(pcsc || preview) &&  <>
                        <span>e-mail: </span>
                        <Mailto
                            email={candidate.email}
                            subject="Відгук на резюме" 
                            body="Доброго дня!"
                            children={candidate.email}
                        />
                        <p> 
                            тел: 
                            {tel
                                ? 
                                    <a href={`tel:+${formatedTel}`}>
                                        {editable ? tel : formatPhoneNumber(tel) }
                                    </a>
                                    
                                :   <span>не надано</span>
                            } 
                            <MobileLogo
                                firstDigits={(tel && tel.slice(3, 5)) || null} 
                                mobileClass={"mobileResumeCard"}
                            />
                        </p>
                    </>}

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
            
                <p className={pcc ? "textResume-short" : "textResume"} > {candidate.resume}</p>
            </article>
            {showFullResume && 
                <div className="blurRect">
                    <div className="modalAddDoc">
                        <PreviewResume
                            onClose={() => setShowFullResume(false)}
                            candidate={candidate}
                            editable={editable}
                            currentUser={currentUser}
                            host={host}
                            parentComponent={"shortCard"}
                            vacancyTitle={vacancyTitle}
                        /> 
                    </div>
                </div>
            }
        </>
    )
  }
  export default ResumeCard