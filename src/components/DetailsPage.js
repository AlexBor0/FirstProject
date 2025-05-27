import formatPhoneNumber from "./FormatePhone";
import MobileLogo from "./MobileLogo";

const DetailsPage = ({ currentUser }) => {

    return(
        <div className="companyProfile">
            <div className="middleWrap" >
                <div className="companyDetails" >

                    {currentUser?.company?.telephone &&
                        <>
                            <span>Телефон: </span>  
                            <p className="subInput">{( formatPhoneNumber(currentUser.company.telephone)) || "тел. номер"}
                                <MobileLogo
                                    firstDigits={currentUser.company.telephone.slice(3, 5)} 
                                    mobileClass={"mobileDetailsPage"}
                                />
                            </p>
                        </>
                    }
                    {currentUser?.company?.telephone2 &&
                        <>
                            <span>Телефон 2: </span>  
                            <p className="subInput">{( formatPhoneNumber(currentUser.company.telephone2)) || "тел. номер"}
                                <MobileLogo
                                    firstDigits={currentUser.company.telephone2.slice(3, 5)} 
                                    mobileClass={"mobileDetailsPage"}
                                />
                            </p>
                        </>
                    }
                    {currentUser?.company?.telephone3 &&
                        <>
                            <span>Телефон 3: </span>  
                            <p className="subInput">{( formatPhoneNumber(currentUser.company.telephone3)) || "тел. номер"}
                                <MobileLogo
                                    firstDigits={currentUser.company.telephone3.slice(3, 5)} 
                                    mobileClass={"mobileDetailsPage"}
                                />
                            </p>
                        </>
                    }
                    {currentUser?.company?.companySite  &&
                        <>
                            <span>Сайт компанії: </span> 
                            <p>{currentUser.company.companySite}</p>
                        </>
                    }
                    {currentUser?.company?.companyEmail &&
                        <>
                            <span>E-mail: </span> 
                            <p>{currentUser.company.companyEmail}</p>
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

        </div>
    )
}
export default DetailsPage;