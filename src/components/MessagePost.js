import React, { useEffect } from "react";

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
        <>
            <h3>{document}</h3>
                <p>Через декілька хвилин {typeOfDoc? "вона" : "воно"} з'явиться у пошуку кандидатів</p>
        </>
    )
}

export default MessagePost