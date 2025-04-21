import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
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
            
            <p>Компанія: {vacancy.company ? vacancy.company : "Назва компанії"}</p>
			<p className="salary" >{vacancy.salary} грн.{" "}</p>
			<p>{city} {vacancy.region&&(`(${vacancy.region} обл.)`)}</p>	
				
			
			<p>Форма зайнятості: {vacancy.employment||"За домовленістю"};</p>
			<p>Графік роботи: {vacancy.workSchedule||"За домовленістю"};</p>
			<p>Формат роботи: {vacancy.workFormats||"За домовленістю"};</p>
			<div><h3>Опис вакансії:</h3> 
				<div>{vacancy.description}</div>
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