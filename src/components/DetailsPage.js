import React from 'react';
import formatPhoneNumber from "./FormatePhone";


const DetailsPage = ({currentUser, setIsPrev, setOpenForm}) => {

    return(
        <div className="companyProfile">
            <div className="middleWrap" >
                <div className="companyDetails" >

                    {currentUser?.company?.telephone &&
                        <>
                            <span>Телефон: </span>  
                            <p className="subInput">{( formatPhoneNumber(currentUser.company.telephone)) || "тел. номер"}</p>
                        </>
                    }
                    {currentUser?.company?.companySite  &&
                        <>
                            <span>Сайт компанії: </span> 
                            <p>{currentUser.company.companySite}</p>
                        </>
                    }
                    {currentUser?.company?.email &&
                        <>
                            <span>E-mail: </span> 
                            <p>{currentUser.company.email}</p>
                        </>
                    }
                    {currentUser?.company?.telegram &&
                        <>
                            <span>Telegram: </span> 
                            <p>{currentUser.company.telegram}</p>
                        </>
                    }

                </div>

                
            </div>
            {/* <div className="wrapOneBtn">
                <button 
                    className="btnEditProfile" 
                        onClick={(e) => {
                            e.preventDefault();
                            setIsPrev(false);
                            setOpenForm(true);
                        }} 
                >
                    РЕДАГУВАТИ
                </button>
            </div> */}
        </div>
    )
}
export default DetailsPage;