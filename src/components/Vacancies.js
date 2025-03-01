import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoCloseCircleSharp } from "react-icons/io5";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const Vacancies = ({host, setTitle}) => {

const [vacancies, setVacancies] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const deleteVacancy = (id) => {
	setVacancies(vacancies.filter((el) => el.id !== id))
		}

	useEffect(() => {

		const fetchVacancies = async () => {

			try {const response = await axios.get(`${host}/api/Vacancies`);
				setVacancies(response.data.data)
				setTitle(response.data.data.map(vacancy => (vacancy.title)));
			} 
			catch (error) {setError(error);} 
			finally {setLoading(false);}
		};

		fetchVacancies();
	}, [host, setTitle]);

if (loading) return <p>Загрузка...</p>;
if (error) return <p>Ошибка: {error.message}</p>

return (

<>
	{vacancies.map(vacancy => (
		
    	<div className="card vacancy" key={vacancy.id}>
			<IoCloseCircleSharp onClick = {() => deleteVacancy(vacancy.id)} className="delete-icon"/>
        	<h2>{vacancy.title}</h2>
        	<p className="salary" >{vacancy.salary} грн.</p>
			<p>Розташування: {vacancy.location} {vacancy.region&&(`(${vacancy.region} обл.)`)}</p>
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
    	</div>
	))}
</>

);

};

export default Vacancies;