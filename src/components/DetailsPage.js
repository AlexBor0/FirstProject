import formatPhoneNumber from "./FormatePhone";
import MobileLogo from "./MobileLogo";

const DetailsPage = ({ currentUser, svgHttp, svgXlink, svgStyle  }) => {

    return(
        <div className="companyProfile">
            <div className="middleWrap" >
                <div className="companyDetails" >

                    {currentUser?.company?.telephone &&
                        <>
                            <span>Телефон: </span>  
                            <p className="subInput">{( formatPhoneNumber(currentUser.company.telephone)) || "тел. номер"}
                                <MobileLogo
                                    firstDigits={currentUser.company.telephone?.slice(3, 5)} 
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

        </div>
    )
}
export default DetailsPage;