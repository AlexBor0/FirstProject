import { IoCloseCircleSharp } from "react-icons/io5";
import FormatDate from './FormatDate';
import Mailto from "./Mailto";
import './../css/Preview.css';
import './../css/ResumeCard.css';
import formatPhoneNumber from "./FormatePhone";
import MobileLogo from "./MobileLogo";


const ResumeCard = ( {
    candidate,
    onClose,
    vacancyTitle,
    imageSrc,
    editable,
    parentComponent
} ) => {

    const tel = candidate?.telephone;
    const formatedTel = tel ? tel.replace(/\D/g, '') : tel;


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
            <header>
             <h3>{vacancyTitle}</h3>
            </header>
            <img src={imageSrc} alt={candidate.foto?"Фото кандидата" : "Фото за замовчуванням"}  width="100px" height="100px" />
            
            <p><strong>{candidate.firstName} {candidate.lastName}</strong> 
            </p> 
            <address>
                <p>{"місто: "}{candidate.city}{" ("}{candidate.region}{" обл.)"}</p>
                
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