import React,  {useState, useEffect} from "react";
import formatPhoneNumber from "./FormatePhone";

const TelephoneInput = ({telephone, telClass, setNewItem }) => {

    const [telephoneDigits, setTelephoneDigits] = useState(() => {
                return telephone ? telephone.replace(/\D/g, '') : '380';
                });

    const getTelNumber = (e) => {
    
        const cursorPosition = e.target.selectionStart;
        const oldValue = e.target.value;
        let value = e.target.value.replace(/\D/g, '');
    
        setTelephoneDigits(value);
    
        setTimeout(() => {
            const newCursorPosition = Math.min(
                formatPhoneNumber(value).length,
                cursorPosition + (formatPhoneNumber(value).length - oldValue.length)
            );
            e.target.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
    };
    
    const manageDigits = (e) => {
    
            
        if (e.target.value.length < 1) {
            setTelephoneDigits("380");
            setTimeout(() => {
                e.target.setSelectionRange(4, 4); 
            }, 0);
        };
    
    };
     
        useEffect (() => {
            setNewItem(prev => ({ ...prev, telephone: formatPhoneNumber(telephoneDigits)}));
    
        }, [telephoneDigits, setNewItem]);
    
        const manageEvents = (e) => {
            const cursorPosition = e.target.selectionStart;
            if (e.key === 'Backspace' && telephoneDigits.length <= 3) {
    
                setTelephoneDigits("380");
                setTimeout(() => {
                    e.target.setSelectionRange(4, 4); 
                }, 10);
            } else if (e.key ==='Backspace' && telephoneDigits.length > 4) {
                setTimeout(() => {
                e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
            }, 10);
            
            } else if (e.key === 'Delete' && !window.getSelection().toString()) {
    
                if (telephoneDigits.length <= 3) {
                    setTelephoneDigits("380");
                    setTimeout(() => {
                        e.target.setSelectionRange(4, 4);
                    }, 10);
                } else {
                    
                    setTimeout(() => {
                        e.target.setSelectionRange(cursorPosition, cursorPosition);
                    }, 10);
                }
            } else if (/^\d$/.test(e.key) && !e.ctrlKey && !e.altKey && !e.metaKey) {
                const cursorPosition = e.target.selectionStart;
                const valueLength = e.target.value.length;
    
                if (cursorPosition < valueLength) {
                    setTimeout(() => {
                        e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
    
                    }, 10);
                }
            }
        };

return (
    <input 
        placeholder="+380 (XX) XXX XX XX" 
        name="telephone"
        minLength="6" 
        maxLength="19" 
        type="tel" 
        className={telClass}
        value={telephone}  
        onInput={getTelNumber}
        onKeyDown={manageEvents}
        onClick={manageDigits}
        onFocus={manageDigits}
    />
)
}

export default TelephoneInput;