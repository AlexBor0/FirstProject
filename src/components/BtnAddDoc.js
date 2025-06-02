import React from "react";

const BtnAddDoc = ({type, setAddDoc}) => {

    return(
       <>
         <button className="addResume" onClick = {() => setAddDoc(true)}>
            <span className="largeBtnTitle">{type?"РОЗМІСТИТИ ВАКАНСІЮ":"РОЗМІСТИТИ РЕЗЮМЕ"}</span>
            <span className="shortBtnTitle" >+</span>
         </button>
       </>)
  

}
export default BtnAddDoc