import './../css/CompanyForm.css';
import CompanyLogo from "./CompanyLogo";
import formatPhoneNumber from "./FormatePhone";


const CompanyProfMain = ({currentUser, newCompany, host, setOpenForm, setIsPrev}) => {


    const imageSrc = newCompany.logo instanceof File 
    && URL.createObjectURL(newCompany.logo);


    return (
 
        <div className="companyProfile">
            <p className="companyName">{currentUser?.company?.companyName || "Назва компанії"}</p>
            <div className="wrapLogoImage">
                <img 
                    className="previewImg" 
                    width="60px" 
                    height="60px" 
                    src={
                        ((currentUser?.company?.logo?.url && host + currentUser.company.logo.formats.thumbnail.url) || imageSrc) || 
                        <CompanyLogo 
                            wordOne="ЛОГО"
                        /> 
                    } 
                    alt="Логотип компанії"
                />
            </div>
            <h4>Реквізити:</h4>
            <div className="companyDetails" >
                <span>Телефон: </span>  
                <p className="subInput">{(currentUser?.company?.telephone && formatPhoneNumber(currentUser?.company?.telephone)) || "тел. номер"}</p>
                <span>Сайт компанії: </span> 
                <p>{currentUser?.company?.companySite || "Сайт компанії"}</p>
                <span>Telegram: </span> 
                <p>{currentUser?.company?.telegram || "Телеграм-канал"}</p>
            </div>
            <div className="wrapOneBtn">
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
            </div>
        </div>


    )
}

export default CompanyProfMain;