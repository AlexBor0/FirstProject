import React, { useEffect, useState } from 'react';
import VacancyCard from './VacancyCard';

const Vacancies = ({host, setTitle, axios}) => {

	const [vacancies, setVacancies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const editable = false;

	const onClose = (id) => {
		setVacancies(vacancies.filter((el) => el.id !== id))
			}

		useEffect(() => {

			const fetchVacancies = async () => {

				try {const response = await axios.get(`${host}/api/Vacancies?populate[company][populate][logo]=true`);
					setVacancies(response.data.data)
					setTitle(response.data.data.map(vacancy => (vacancy.title)));
				} 
				catch (error) {setError(error);} 
				finally {setLoading(false);}
			};

			fetchVacancies();
		}, [host, setTitle, axios]);

		

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка: {error.message}</p>

	return (
			
			<div >
				{vacancies.map(el => (
					
					<VacancyCard
					key={el.id}
					onClose={onClose}
					vacancy={el}
					editable={editable}
					parentComponent={'Vacancies'}
					host={host}
					/>
				))}

			</div>
		
		);

};

export default Vacancies;