         
   const PrimaryMessage = ({setIsPrev, setOpenForm}) => {      

       const explanation = 
               <p className="explanation">
                   Додайте<br/> 
                   інформацію про вашу компанію:
                   назву, логотип та реквізити, за якими 
                   можуть звертатися потенційні претенденти.
                   Ця інформація буде додаватися до карток ваших вакансій
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