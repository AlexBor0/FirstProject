import { useState } from 'react';
import { IoCloseCircleSharp } from "react-icons/io5";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import formatPhoneNumber from "./FormatePhone";
import FormatDate from './FormatDate';
import PreviewVacancy from './PreviewVacancy';
import './../css/Preview.css';
import './../css/VacancyCard.css';


const VacancyCard = ({vacancy, onClose, editable, preview, parentComponent, currentUser, host}) => {
    const [showFullVacancy, setShowFullVacancy] =useState(false);

    const city = editable ? vacancy.city : vacancy.location,
          pcv = parentComponent === 'Vacancies',
          pcsc = parentComponent === 'shortCard',
          tel = (editable || preview)? currentUser?.company?.telephone : vacancy?.company?.telephone,
          formatedTel = tel ? tel.replace(/\D/g, '') : tel,
          site = (editable || preview) ? currentUser?.company?.companySite : vacancy?.company?.companySite, 
          telegram = (editable || preview) ? currentUser?.company?.telegram : vacancy?.company?.telegram;



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
                    
                    <div className="leftSide">
                        <p className="salary" >{vacancy.salary} грн.{" "}</p>
                        
                        
                        <address>
                            <p>{city} {vacancy.region&&(`(${vacancy.region} обл.)`)}</p>	
                        </address>

                        <div className="vacancyInfo">

                        
                            <div className="wrapProperties">
                                <div className="wrapPropBlock">
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

                            </div>
                            
                        </div>
                    
                        
                    </div>
                     
                    <div className="rightSide">
                        <div>
                            <p><b>{((pcv || pcsc)? vacancy?.company?.companyName : currentUser?.company?.companyName) || "Назва компанії"}</b></p>
                            {(pcsc || editable || preview) &&
                                <details>
                                    <summary>Реквізити</summary>
                                    <address>

                                        <p>тел: {tel? (<a href={`tel:+${formatedTel}`}>{ formatPhoneNumber(tel) }</a>) : (<span>не надано</span>)} </p>
                                        <p>сайт: {site ? (<a href={site}>посилання на сайт</a>) : (<span>відсутній</span>)} </p> 
                                        <p>телеграм: {telegram ? (<a href={telegram}>телеграм</a>) : (<span>відсутній</span>)} </p>

                                    </address>
                                </details>
                            }
                             


                        </div>
                       
                        {(editable || preview) && currentUser?.company?.logo && 
                                <img 
                                    width="100px"
                                    height="100px"
                                    className="companyLogo" 
                                    src={host + (currentUser.company.logo?.formats?.thumbnail?.url || currentUser.company.logo.url)} 
                                    alt="Логотип компанії"
                                />
                        }
                        {(pcv || pcsc) && vacancy?.company?.logo && 
                            <img 
                                width="100px"
                                height="100px"
                                className="companyLogo" 
                                src={host + (vacancy.company.logo?.formats?.thumbnail?.url || vacancy.company.logo.url)} 
                                alt="Логотип компанії"
                            />   
                        }
                    </div>
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
                            parentComponent={"shortCard"}
                        /> 
                    </div>
                </div>
            }
        </>
    )
}
export default VacancyCard