import React from "react";

const BtnAddDoc = ({type, setAddDoc}) => {

    return(
       <>
         <button className="addResume" onClick = {() => setAddDoc(true)}>
            {type?"РОЗМІСТИТИ ВАКАНСІЮ":"РОЗМІСТИТИ РЕЗЮМЕ"}
         </button>
       </>)
  

}
export default BtnAddDoc