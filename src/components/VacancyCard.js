import { useState, useEffect, useRef } from 'react';
import { IoCloseCircleSharp } from "react-icons/io5";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import FormatDate from './FormatDate';
import PreviewVacancy from './PreviewVacancy';
import DetailsTelephone from './DetailsTelephone';
import Mailto from "./Mailto";
import './../css/Preview.css';
import './../css/VacancyCard.css';
import LogoImgVC from './LogoImgVC';


const VacancyCard = ( {
    vacancy,
    onClose,
    editable,
    preview,
    parentComponent,
    currentUser,
    host
} ) => {
    const [showFullVacancy, setShowFullVacancy] =useState(false),
          [typeLogo, setTypeLogo] = useState(true);

    const companyTitleRef = useRef(null);
    const companyLogoRef = useRef(null);


    const city = editable ? vacancy.city : vacancy.location,
          pcv = parentComponent === 'Vacancies',
          pcsc = parentComponent === 'shortCard',
          conditions = editable || preview,
          companyData = conditions ? currentUser?.company : vacancy?.company,
          isLogo = currentUser?.company?.logo || vacancy?.company?.logo;
    const { telephone: tel, telephone2: tel2, telephone3: tel3, companySite: site, companyEmail: email, telegram} = companyData || {};
    const details = tel || tel2 || tel3 || email || site || telegram;

    useEffect (() => {

        if (companyTitleRef.current && companyLogoRef.current) {
        const titleHeight = companyTitleRef.current.offsetHeight;
        const logoHeight = companyLogoRef.current.offsetHeight;
        const isHeight = titleHeight < logoHeight / 2
        setTypeLogo(isHeight);
      }

    },[ companyTitleRef, companyLogoRef ]);



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
                        <div className="companyTitle" ref={companyTitleRef}>
                            <p ><b>{((pcv || pcsc)? vacancy?.company?.companyName : currentUser?.company?.companyName) || "Назва компанії:"}</b></p>
                            {!typeLogo && pcsc && <LogoImgVC
                                conditions={conditions}
                                isLogo={isLogo}
                                host={host}
                                pcv={pcv}
                                pcsc={pcsc}
                                ref={companyLogoRef}
                            />}
                        </div>
                        <div >
                            
                            {(pcsc || conditions) && details &&
                                <div className='details'>
                                    <h4>Реквізити:</h4>
                                    <address>

                                        {tel && <DetailsTelephone
                                            tel= { tel }
                                            word = {'тел:'}
                                        />}
                                        {tel2 && <DetailsTelephone
                                            tel= { tel2 }
                                            classTel = {'classTel'}
                                        />}
                                        {tel3 &&
                                        <DetailsTelephone
                                            tel= { tel3 }
                                            classTel = {'classTel'}
                                        />}
                                       {email && <p>e-mail: {}  
                                                    <Mailto
                                                        email={email}
                                                        subject="Відгук на вакансію" 
                                                        body="Доброго дня!"
                                                        children={email}
                                                    /> 
                                                </p>} 
                                       {site && <p>сайт:  <a href={site}>посилання на сайт</a> </p>} 
                                       {telegram && <p>телеграм:  <a href={telegram}>телеграм</a></p>}

                                    </address>
                                </div>
                            }
                         
                        </div>
                        {(typeLogo || !pcsc) && <LogoImgVC
                            conditions={conditions}
                            isLogo={isLogo}
                            host={host}
                            pcv={pcv}
                            pcsc={pcsc}
                            ref={companyLogoRef}
                        />}
                       
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