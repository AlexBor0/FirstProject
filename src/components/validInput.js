  
const validInput = (value, inputElement, exceptions = [], setInputErrors) => {


    if(inputElement.type === "text") {
      
        const baseForbiddenChars = ['<', '>', '{', '}', '[', ']', '(', ')', '&', '$', '%', '#', '?', '!', '*', '^', '+', '=', '|', '\\', ':', ';', ',', '"', "'", '`', '~'];
        const forbiddenChars = baseForbiddenChars.filter(char => !exceptions.includes(char));
        
        function createPreEscapedRegex(forbiddenChars) {
            const charMap = {
                 '*': '\\*', '+': '\\+', '?': '\\?', '^': '\\^', '$': '\\$', '{': '\\{', '}': '\\}', '(': '\\(', ')': '\\)','|': '\\|', '[': '\\[', ']': '\\]', '\\': '\\\\'
            };
            
            const escaped = forbiddenChars
                .map(char => charMap[char] || char)
                .join('');
            return new RegExp(`[${escaped}]`);
        }

        const mat = value.match(createPreEscapedRegex(forbiddenChars));
        
        if (mat) {
            setInputErrors(prev => ({
                ...prev,
                [inputElement.name]: 'Використання таких символів не допускається'
            }));
            inputElement.setCustomValidity('Внесений некоректний символ/ли');
        } else {
            setInputErrors(prev => ({
                ...prev,
                [inputElement.name]: ''
            }));

            inputElement.setCustomValidity('');
        }
    }
  };

  export default validInput;