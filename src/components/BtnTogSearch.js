import React, {useEffect, useState} from "react";

const BtnTogSearch = (props) => {
        const [clicked, toggleClick] = useState(false);

        let text = "ШУКАЧУ",
            title = "работодавця";
        if (clicked) {
            text = "РАБОТОДАВЦЮ";
            title = "шукача";}
   
    useEffect (() => {
        document.title = `Для ${title}`;
      })
            return(
                <button tabIndex={1} className="chooseDirection" 
                    onClick = {() => {
                    toggleClick(!clicked);
                    props.setTypeOfsearch(!props.typeOfSearch);
                    }} 
                >
                    {text}
                </button>
            );
  

};
export default BtnTogSearch