         
   const PrimaryMessage = ({setIsPrev, setOpenForm}) => {      

       const explanation = 
               <p className="explanation">
                   Додайте<br/> 
                   назву вашої компанії:
                   назву та логотип 
               </p>

        return (          
                <div className="primaryMessage" >
                    {explanation}
                    <button 
                        className="btnAdd"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsPrev(false);
                            setOpenForm(true);
                        }}
                    >
                        ДОДАТИ
                    </button>
                </div>
        )
    }
export default PrimaryMessage;