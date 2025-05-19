import { useState } from 'react';
import { IoCloseCircleSharp } from "react-icons/io5";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import FormatDate from './FormatDate';
import PreviewVacancy from './PreviewVacancy';
import './../css/Preview.css';
import './../css/VacancyCard.css';


const VacancyCard = ({vacancy, onClose, editable, preview, parentComponent, currentUser, host}) => {
    const [showFullVacancy, setShowFullVacancy] =useState(false);

    const city = editable ? vacancy.city : vacancy.location;
    const pcv = parentComponent === 'Vacancies';
    const fci = parentComponent === 'fullCardInfo';


    return (
        <>
            <article className="card vacancy" >
                {!editable&&
                    <button 
                        autoFocus={parentComponent !== 'Vacancies' && true} 
                        onClick = {() => onClose(vacancy.id)}
                    >
                        <IoCloseCircleSharp className="delete-icon"/>
                    </button>
                }
                <header>
                    {pcv
                    ?   <button 
                        onClick={() => setShowFullVacancy(true)}
                    >
                            {vacancy.title }
                        </button>
                    :   <h3>{editable ? vacancy.vacancy : vacancy.title }</h3>}
                    
                </header>
                <div className="brieflyMain">
                    {(editable || preview) && currentUser?.company?.logo && 
                            <img 
                                width="100px"
                                height="100px"
                                className="companyLogo" 
                                src={host + (currentUser.company.logo?.formats?.thumbnail?.url || currentUser.company.logo.url)} 
                                alt="Логотип компанії"
                            />
                    }
                    {(pcv || fci) && vacancy?.company?.logo && 
                        <img 
                            width="100px"
                            height="100px"
                            className="companyLogo" 
                            src={host + (vacancy.company.logo?.formats?.thumbnail?.url || vacancy.company.logo.url)} 
                            alt="Логотип компанії"
                        />   
                    }
                        <p className="salary" >{vacancy.salary} грн.{" "}</p>
                        
                    <p><b>Работодавець: {((pcv || fci)? vacancy?.company?.companyName : currentUser?.company?.companyName) || "Назва компанії"}</b></p>
                    <address>
                        <p>{city} {vacancy.region&&(`(${vacancy.region} обл.)`)}</p>	
                    </address>	
                    <div className="vacancyInfo">
                        <div className="vacancyProperties">
                            <span>Форма зайнятості:</span>
                            <span>Формат роботи:</span>
                            <span>Графік роботи:</span>
                        </div>
                        <div className="propertieValues">
                            <span>{vacancy.employment||"За домовленістю"}</span>
                            <span>{vacancy.workFormats||"За домовленістю"}</span>
                            <span>{vacancy.workSchedule||"За домовленістю"}</span>
                        </div>
                        
                    </div>
                    
                    
                    {!editable&& 
                        <div className="dates">
                            <div className="vacancyProperties">
                                <span>Створено:{" "}</span>
                                <span>Оновлено:{" "}</span>
                            </div>
                            <div className="propertieValues">
                                <time>
                                    <FormatDate isoDate={vacancy.createdAt}/>
                                </time>
                                <time>
                                    <FormatDate isoDate={vacancy.updatedAt}/>
                                </time> 
                            </div>       
                                            
                        </div>
                    }
                        <div ><h3>Опис вакансії:</h3> 
                            <div className={pcv?"description-short":"description"} >{vacancy.description}</div>
                        </div>

                </div>
                {!pcv && 
                    <>
                        
                        <hr/>
                        <div className="requirements">
                            <h3>Вимоги до претендента: </h3>
                            <p>Бажаний досвід роботи (років): 
                                <span style={{fontWeight: 'bold'}}>
                                    {vacancy.experience? vacancy.experience : "Можливо без досвіду"}
                                </span>
                            </p>
                            {vacancy.requirements&&<BlocksRenderer content = {vacancy.requirements}/>}
                        </div> 
                    
                    </>
                }	

            </article>
            {showFullVacancy && 
                <div className="blurRect">
                    <div className="modalAddDoc">
                        <PreviewVacancy
                            onClose={() => setShowFullVacancy(false)}
                            vacancy={vacancy}
                            editable={editable}
                            currentUser={currentUser}
                            host={host}
                            parentComponent={"fullCardInfo"}
                        /> 
                    </div>
                </div>
            }
        </>
    )
}
export default VacancyCard