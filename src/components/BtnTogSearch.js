import React, { useState} from "react";

const BtnTogSearch = ({typeOfSearch, setTypeOfsearch}) => {
        const [clicked, toggleClick] = useState(false);

        let text = "ШУКАЧУ";
            
       clicked? text = "ШУКАЧУ":text = "РАБОТОДАВЦЮ";

            return(
                <button tabIndex={1} className="chooseDirection" 
                    onClick = {() => {
                    toggleClick(!clicked);
                    setTypeOfsearch(!typeOfSearch);
                    }} 
                >
                    {text}
                </button>
            );
};
export default BtnTogSearch