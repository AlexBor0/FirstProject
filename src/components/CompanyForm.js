import React, {useState, useEffect}  from "react";
import { IoCameraSharp, IoCloseCircleSharp } from "react-icons/io5";
import TelephoneInput from "./TelephoneInput";
import Spinner from "./Spinner";
import './../css/CompanyForm.css';
import CompanyLogo from "./CompanyLogo";

const CompanyForm = ({currentUser, getDataItems, setCurrentUser}) => {

    const [editCompany, setEditCompany] = useState({
        companyName: "",
        logo: "",
        telephone: ""
    });
    const telClass ="inputEditProfile text";

    const explanation = 
        <p className="explanation">
            <span>Додайте</span><br/> 
            інформацію про вашу компанію:
            назву, логотип та реквізити, за якими 
            можуть звертатися потенційні претенденти.
            Ця інформація буде додаватися до карток ваших вакансій
        </p>
    const [isPrev, setIsPrev] = useState(true),
          [fileSize, setFileSize] = useState(''),
          [openForm, setOpenForm] = useState(true),
          [validText, setValidText] = useState(null);

          const imageSrc = editCompany.logo instanceof File 
          && URL.createObjectURL(editCompany.logo);

          const getImage = (e) => {
            setValidText("");
              const file = e.target.files[0];
              if(file) {
                  if ( file.size > 120 * 1024 ) {
                  e.target.setCustomValidity('Розмір файла не повинен перевищувати 120 кВ');
                  setValidText("Не більше 120kb!");
                  return;
                  } else {
                  setValidText("");
                  setEditCompany(prev => ({...prev, logo: file}));
                  setFileSize( (file.size / 1024).toFixed(1));
                  e.target.setCustomValidity('');
              } }   
          };

          const deleteImage = (e) => {
            e.preventDefault();
            setEditCompany(prev => ({...prev, logo: null}));
            setFileSize(null);
            setValidText("");
          };


    return (
        <>
            <div className="companyForm">

                { isPrev &&
                    <div className="prevMessage" >
                        {explanation}
                        <button 
                            className="btnAdd"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsPrev(false);

                            }}
                        >
                            ДОДАТИ
                        </button>
                    </div>
                }
                <div>
                    { (openForm && !isPrev) &&
                        <form 
                            id="editCompany"
                            onSubmit={
                                (e) => {
                                    e.preventDefault();
                                }
                            }
                        >
                            {openForm
                                ?(<input className="inputEditProfile text" type="text" name="companyName" placeholder={currentUser.companyName || "Назва компанії"}
                                    onChange={(e) => getDataItems(e, { setNewDoc: setCurrentUser, validate: true })}
                                    />)
                                :(<p>{currentUser.companyName || "Назва компанії"}</p>)}
                                
                                <div className="wrapLogoImage">
                                    {editCompany.logo 
                                    ? <img className="previewImg" width="100px" height="100px" src={ editCompany.logo && imageSrc } alt=""/>
                                    : <div className="subImg" > 
                                        <CompanyLogo 
                                            wordOne="ЛОГО"
                                            // wordTwo="КОМПАНІЇ"
                                        />
                                       </div>
                                    }

                                    <div className="changeFoto"> 
                                    <label required htmlFor="imageF">
                                        <input autoFocus={ true } type="file" id="imageF" className="inputFile" name="foto" accept=".png, .jpg, .jpeg, .webp" 
                                            onChange={ getImage } 
                                        />
                                        <IoCameraSharp className="delete-icon"/>
                                    </label>
                                    <button className="delPrevImg" 
                                            autoFocus={true}
                                            onClick={ deleteImage }>
                                        <IoCloseCircleSharp className="delete-icon"/>
                                    </button>
                                    </div>

                                </div>
                                <h4>Реквізити:</h4>
                                <div className="companyDetails" >
                                    <span>Телефон: </span> 
                                    {openForm
                                    ?   
                                        <TelephoneInput
                                            telClass={telClass}
                                            telephone={editCompany.telephone}
                                            setNewItem={setEditCompany}
                                        />
                                        
                                    :(<p>{currentUser.companyName || "Назва компанії"}</p>)}

                                    <span>Сайт компанії: </span> 
                                    {openForm
                                    ?(<input className="inputEditProfile text" type="text" name="companySite" placeholder={currentUser.companySite || "https://"}
                                        onChange={(e) => getDataItems(e, { setNewDoc: setCurrentUser, validate: true })}
                                        />)
                                    :(<p>{currentUser.companySite || "Сайт компанії"}</p>)}

                                    <span>Telegram: </span> 
                                    {openForm
                                    ?(<input className="inputEditProfile text" type="text" name="telegram" placeholder={currentUser.telegram || "https://t.me/"}
                                        onChange={(e) => getDataItems(e, { setNewDoc: setCurrentUser, validate: true })}
                                        />)
                                    :(<p>{currentUser.telegram || "Телеграм-канал"}</p>)}
                                </div>

                            
                        </form>
                    }
                </div>



            </div>
            
        </>

    )
}

export default CompanyForm;