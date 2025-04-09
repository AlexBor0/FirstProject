import React from "react";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const PreviewVacancy = ({post, edit, previewContentRef, newVacancy, requirements}) => {

    
    return (
        <>
        <div className="previewModal" >
            <h3 className="previewH3">Прев'ю вакансії</h3>
            <div className="previewHeader"> 
                <button className="btnEdit" 
                    onClick={edit}
                    autoFocus={true}
                >Редагувати
                </button>
                <button className="btnPublish"
                   onClick={post}
                >Опублікувати</button>
                
            </div>
                <div className="previewContent" ref={previewContentRef}>
                    <div className="card vacancy" >     
                        <h2>{newVacancy.vacancy}</h2>
                        <p className="salary" >{newVacancy.salary} грн.{" "}
                            <span>{newVacancy.city} {newVacancy.region&&(`(${newVacancy.region} обл.)`)}
                            </span>
                        </p>
                        <p>Форма зайнятості: {newVacancy.employment||"За домовленістю"};</p>
                        <p>Графік роботи: {newVacancy.workSchedule||"За домовленістю"};</p>
                        <p>Формат роботи: {newVacancy.workFormat||"За домовленістю"};</p>
                        <h3>Опис вакансії:</h3> 
                        <div style={{width:"100%"}}>
                            <p style={{overflowWrap: "break-word"}} >{newVacancy.description}</p>
                        </div>
                        <hr/>
                        <div>
                            <strong>Вимоги до претендента: </strong>
                            <p>Бажаний досвід роботи (років): <span style={{fontWeight: 'bold'}}>{newVacancy.experience && newVacancy.experience > 0? newVacancy.experience : "Можливо без досвіду"}</span></p>
                            {requirements.length > 0 ? 
                                (<BlocksRenderer content={requirements} />) :
                                (<p>Вимоги відсутні</p>)
                            }
                        </div>
                    </div>
                </div>
        </div>
        </>
    )
}
export default PreviewVacancy