
const formatPhoneNumber = (digits) => {
    
    if (!digits) return '';
    const isUkraine = digits.startsWith("380");
    if (!isUkraine) {
        return "+" + digits.slice(0, 15);
    }

     let formatted = "+";

    if(digits.length <= 3) {
        formatted += digits;
     } else {
        formatted += digits.slice(0, 3) + " (";
        if (digits.length <= 5) {
            formatted += digits.slice(3)
        } else {
            formatted += digits.slice(3, 5) + ") " 
            if (digits.length <= 8) {
                formatted += digits.slice(5); 
             } else {
                formatted += digits.slice(5, 8) + "-";
                if (digits.length <= 10) {
                    formatted += digits.slice(8); 
                } else {
                    formatted += digits.slice(8, 10) + "-";
                    if (digits.length <= 12) {
                        formatted += digits.slice(10); 
                    } 
                    // else if (counryCode && (digits.length > 12)) {
                    //     formatted += digits.slice(10, 12) + "-";
                    //     formatted += digits.slice(12); 
                    // }
                    else {
                        formatted += digits.slice(10, 12);
                    }
                } 
            }
         }
    }
    return formatted;
     };
export default formatPhoneNumber;