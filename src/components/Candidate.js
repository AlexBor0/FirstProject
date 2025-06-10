import React from "react";
import GestAva from "./../img/GestAva.png";
import ResumeCard from "./ResumeCard";


const Candidate = ({candidate, onDelete, host}) => {
    const editable = false;

    // const getVacanciesFromList = (a) => {
        
    //     let vacanciesArray = [];
    //     for ( let i = 0; i < a.length; i++) {
    //         vacanciesArray[i] = a[i].title;
    //     }
    //     let entry = vacanciesArray.join(', ');
    //     return entry;
    // };

    const imageSrc = candidate.foto
        ? `${host}${candidate.foto.url}` 
        : GestAva;

    const onClose = () => {
        onDelete(candidate.id);
    };
    // const vacancyTitle = candidate.vacancies&&candidate.vacancies.length > 0 ? getVacanciesFromList(candidate.vacancies) : "За запитом";
    const vacancyTitle = candidate.title;
       return (
        <>
            <ResumeCard
                candidate={candidate}
                onClose={onClose}
                vacancyTitle={vacancyTitle}
                imageSrc={imageSrc}
                editable={editable}
                parentComponent={'Candidate'}
                host={host}
            />
        </>
       
    )
  }
  export default Candidate