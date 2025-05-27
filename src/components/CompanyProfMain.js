import './../css/CompanyForm.css';
import CompanyLogo from "./CompanyLogo";



const CompanyProfMain = ({
    currentUser,
    newCompany,
    host,
    setOpenForm,
    setIsPrev
}) => {

    const imageSrc = newCompany.logo instanceof File 
    && URL.createObjectURL(newCompany.logo);


    return (
 
        <div className="companyProfile">
            <div className="middleWrap" >
                <p className="companyName">{currentUser?.company?.companyName || "Назва компанії"}</p>
                <div className="wrapLogoImage">
                    <img 
                        className="previewImg" 
                        width="100px" 
                        height="100px" 
                        src={
                            ((currentUser?.company?.logo?.url && host + currentUser.company.logo.formats.thumbnail.url) || imageSrc) || 
                            <CompanyLogo 
                                wordOne="ЛОГО"
                            /> 
                        } 
                        alt="Логотип компанії"
                    />
                </div>
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