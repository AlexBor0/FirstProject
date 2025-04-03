import React, { useEffect } from "react";
import { FcOk } from "react-icons/fc";
import './../css/MessagePost.css';

const MessagePost = ({isOpen, onClose, setAddDoc, typeOfDoc}) => {

    const document = typeOfDoc? "Вакансія успішно опублікована": "Резюме успішно опубліковано";

    useEffect(() => {
        if(isOpen) {
            const timer = setTimeout(() => {
                onClose(null);
                setAddDoc(false);

            }, 3000);
            return () => clearTimeout(timer);
        }
        
    }, [isOpen, onClose, setAddDoc]);

    if (!isOpen) return null;

    return(
        <div className="messagePost">
            <div>
                <FcOk className="ok-icon"/>
            </div>
            <div>
                <h3>{document}</h3>
                <p>Через декілька хвилин {typeOfDoc? "вона" : "воно"} з'явиться у пошуку кандидатів</p>
            </div>     
        </div>
    )
}

export default MessagePost