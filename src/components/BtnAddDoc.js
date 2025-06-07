
const BtnAddDoc = ({type, setAddDoc, isClicked=""}) => {

   const btnTitle = type ? "РОЗМІСТИТИ ВАКАНСІЮ" : "РОЗМІСТИТИ РЕЗЮМЕ"


    return(
       <>
         <button className="addResume" onClick = {() => setAddDoc(true)}>
            <span className="largeBtnTitle">{ btnTitle }</span>
            <span className="shortBtnTitle">{ isClicked ? btnTitle : "+"}</span>
         </button>
       </>)

}
export default BtnAddDoc