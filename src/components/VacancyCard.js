import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import FormatDate from './FormatDate';
import './../css/Preview.css';
import './../css/VacancyCard.css';


const VacancyCard = ({vacancy, onClose, editable, parentComponent}) => {

    const city = editable ? vacancy.city : vacancy.location;


    return (
        <article className="card vacancy" >
            {!editable&&
                <button 
                autoFocus={parentComponent !== 'Vacancies' && true} 
                onClick = {onClose}
                >
                    <IoCloseCircleSharp className="delete-icon"/>
                </button>
            }
            <header>
             <h3>{editable ? vacancy.vacancy : vacancy.title }</h3>
            </header>
			<p className="salary" >{vacancy.salary} грн.{" "}</p>
            <p><b>Компанія: {vacancy.company ? vacancy.company : "Назва компанії"}</b></p>
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
			<div><h3>Опис вакансії:</h3> 
				<div className="description">{vacancy.description}</div>
			</div>
			<hr/>
			<div>
				<strong>Вимоги до претендента: </strong>
				<p>Бажаний досвід роботи (років): <span style={{fontWeight: 'bold'}}>{vacancy.experience? vacancy.experience : "Можливо без досвіду"}</span></p>
				{vacancy.requirements&&<BlocksRenderer content = {vacancy.requirements}/>}
			</div>      

        </article>
    )
}
export default VacancyCard