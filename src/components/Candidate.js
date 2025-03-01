import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import GestAva from "./../img/GestAva.png";


const Candidate = ({user, onDelete, host}) => {
    const vacancy = user.vacancies;
    const getVacanciesFromList = (a) => {
        
        let vacanciesArray = [];
        for ( let i = 0; i < a.length; i++) {
            vacanciesArray[i] = a[i].title;
        }
        let entry = vacanciesArray.join(', ');
        return entry;
    }


       return (
        <div className="card candidate list" >
            <IoCloseCircleSharp onClick = {() => onDelete(user.id)} className="delete-icon"/>
            <p>Претендент на вакансі{vacancy&&vacancy.length<=1?'ю':'ї'}: <strong>{vacancy&&vacancy.length>0?getVacanciesFromList(vacancy):" За запитом"}</strong>
             {" у місті: "}{user.city}{" ("}{user.region}{" обл.)"} </p>
            <img src={user.foto?host + user.foto.url:GestAva} alt={user.foto?user.foto.alternativeText:"Фото кандидата"}  width="100px" height="100px" />
            
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
            <p>{user.resume}</p>
        </div>
    )
  }
  export default Candidate