import {useState, useEffect} from "react";
import formatPhoneNumber from "./FormatePhone";

const TelephoneInput = ( {
    telephone,
    telClass,
    setNewItem,
    currentUser,
    fieldName = 'telephone',
    telephoneKey = 'telephone'
} ) => {

    const [telephoneDigits, setTelephoneDigits] = useState(() => {
                return telephone ? telephone.replace(/\D/g, '') : '380';
                });
    const [isFocused, setIsFocused] = useState(false);

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
            setNewItem(prev => ({ 
                ...prev,
                [fieldName]: formatPhoneNumber(telephoneDigits)}));
    
        }, [telephoneDigits, setNewItem, fieldName]);
    
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

    const placeFocus = () => {
         setIsFocused(true);
    };

     const placeBlur = () => {
        setIsFocused(false);
    };

        const getPlaceholderValue = () => {
        const currentTelephone = currentUser?.company?.[telephoneKey];
        return currentTelephone
            ? formatPhoneNumber(currentTelephone.replace(/\D/g, ''))
            : "+380 (XX) XXX XX XX";
    };

return (
    <input 
        placeholder={getPlaceholderValue()} 
        name={telephone}
        minLength="6" 
        maxLength="19" 
        type="tel" 
        className={telClass}
        value={isFocused || telephoneDigits !== '380' ? formatPhoneNumber(telephoneDigits) : ''} 
        onInput={getTelNumber}
        onKeyDown={manageEvents}
        onClick={manageDigits}
        onFocus={(e) => {
            manageDigits(e);
            placeFocus();
        }}
        onBlur={placeBlur}
    />
)
}

export default TelephoneInput;