import React, { useEffect } from "react";
import { FcOk } from "react-icons/fc";
import { IoCloseCircleSharp } from "react-icons/io5";
import './../css/MessagePost.css';

const MessagePost = ({isOpen, onClose, closeItem, typeOfDoc, newClass, fetchGetInfo, setPostFetch }) => {

    const document = typeOfDoc==="Компанія"? "Інформацію про компанію додано!" : (typeOfDoc? "Вакансія успішно опублікована": "Резюме успішно опубліковано"); 

    const closeMessagePost = () => {
        fetchGetInfo();
        onClose(null);
        closeItem(false);
        setPostFetch(false);
    }
    
    useEffect(() => {
        if(isOpen) {
            const timer = setTimeout(() => {
                fetchGetInfo();
                onClose(null);
                closeItem(false);
                setPostFetch(false);

            }, 3000);
            return () => clearTimeout(timer);
        }
        
    }, [isOpen, onClose, closeItem, fetchGetInfo, setPostFetch]);

    if (!isOpen) return null;

    

    return(
        <div className={ newClass }>
            <div>
                    <FcOk className="ok-icon"/>
                </div>
            
            <div className="messagePost">
                
                <div>
                    <h3>{document}</h3>
                    <p>Через декілька хвилин {typeOfDoc? "вона" : "воно"} з'явиться у {typeOfDoc==="Компанія"? "вашому профілі" : "пошуку"}</p>
                </div> 
                
                    
            </div>
                <button className="pageBtn">
                    <IoCloseCircleSharp 
                        className="delete-icon" 
                        onClick = {closeMessagePost}
                        />
                </button>
        </div>
    )
}

export default MessagePost