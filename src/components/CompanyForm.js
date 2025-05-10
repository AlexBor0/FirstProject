import React, {useState}  from "react";
import { IoCameraSharp, IoCloseCircleSharp } from "react-icons/io5";
import TelephoneInput from "./TelephoneInput";
import CompanyLogo from "./CompanyLogo";


const CompanyForm = ({currentUser, getDataItems, setCurrentUser, axios, host, newCompany, setNewCompany, resetNewCompany, setLoading, setPostSuccess, setPostFetch, setOpenForm, setIsPrev }) => {

 

    const [fileSize, setFileSize] = useState(''),
          [failUpload, setFailUpload] = useState(null),
          [error, setError] = useState(null),
          [validText, setValidText] = useState(null);

          const imageSrc = newCompany.logo instanceof File 
          && URL.createObjectURL(newCompany.logo);

          const getLogoImage = (e) => {
            deleteImage(e);
              const file = e.target.files[0];
              if(file) {
                  if ( file.size > 120 * 1024 ) {
                  e.target.setCustomValidity('Розмір файла не повинен перевищувати 120 кВ');
                  setValidText("Не більше 120kb!");
                  return;
                  } else {
                  setValidText("");
                  setNewCompany(prev => ({...prev, logo: file}));
                  setFileSize( (file.size / 1024).toFixed(1));
                  e.target.setCustomValidity('');
              } }   
          };

          const deleteImage = (e) => {
            e.preventDefault();
            setNewCompany(prev => ({...prev, logo: null}));
            setFileSize(null);
            setValidText("");
          };

          const goBack = (e) => {
            e.preventDefault();
            resetNewCompany();
            setFileSize('');
            setOpenForm(false);
            setIsPrev(true)
          };


          const apiRequest = async (apiCall) => {
            setLoading(true);
            setPostFetch(true);
            try {
              const response = await apiCall();
              setPostSuccess(true);
              return response;
            } catch (error) {
              setError(error);
              console.error('Ошибка:', error.response?.data || error.message);
            } finally {
              setLoading(false);
            }
          };

        const fetchNewCompany = async () => {
            const file = new FormData();
            file.append("files", newCompany.logo);
        
            const imageResponse = await apiRequest(() =>
            axios.post(`${host}/api/upload`, file, {
                headers: {
                'Authorization': `Bearer ${currentUser.userJWT}`, 
                'Content-Type': 'multipart/form-data', 
                },
            })
            );
            const newFotoId = imageResponse?.data[0].id;
        
        
            const data = {
            companyName: newCompany.companyName,
            logo: newFotoId && newFotoId,
            telephone: newCompany?.telephone && newCompany.telephone.replace(/\D/g, ''),
            companySite: newCompany?.companySite,
            telegram: newCompany?.telegram,
            user: {connect: [currentUser.id] },
            };
        
            const response = await apiRequest(() =>
            axios.post(`${host}/api/companies`, { data }, {
                headers: { 
                'Authorization': `Bearer ${currentUser.userJWT}`,
                'Content-Type': 'application/json' },
            })
            );
            if (response) {
            setNewCompany((prev) => ({ ...prev, documentId: response.data.data.documentId }));

            }
            if 
            // (response.status === 400 && 404) 
            (response.status!== 200) {
                setFailUpload(true);
            };
            if(error) {
            console.log(error.message)
            }
        };
        
        // useEffect ((newFotoId) => {
        //     if (failUpload) {
        //     const fetchDeleteImage = async () => {
        //         const deletePrevImage = await axios.delete(
        //         `${host}/api/upload/files/${newFotoId}`,
        //         {
        //             headers: {
        //             Authorization: `Bearer ${currentUser.userJWT}`,
        //             },
        //         }  
        //         );
        //         if (deletePrevImage.status !== 200) {
        //         throw new Error("Помилка при видаленні відправленого файлу");
        //         };
        //     };
        //     fetchDeleteImage();
        //     }     
        // }, [currentUser.userJWT, host, axios, failUpload]);


    return (         
           
            <div className="companyForm">

                <form 
                    id="editCompany"
                    onSubmit={
                        (e) => {
                            e.preventDefault();
                        }
                    }
                >

                    <input 
                        required
                        className="inputEditProfile text" 
                        type="text" name="companyName" 
                        placeholder={currentUser?.company?.companyName || "Назва компанії"}
                        onChange={(e) => getDataItems(e, { setNewDoc: setNewCompany, validate: true })}
                        
                    />
                        
                    <div className="wrapLogoImage">
                        {(newCompany.logo) 
                        ? <img className="previewImg" width="60px" height="60px" src={ newCompany.logo && imageSrc } alt="Логотип компанії"/>
                        : <div className="subImgComp" width="60px" height="60px"> 
                            {/* {(currentUser?.company?.logo?.url && host + currentUser.company.logo.formats.thumbnail.url) || */}
                            <CompanyLogo 
                                wordOne="ЛОГО"
                            />
                            {/* } */}
                        </div>
                        }
                            <div className="wrapBtnsImg">

                                <div className="subImg" > 
                                    {(fileSize && (fileSize < 120) && <span className="dark"> {fileSize} kb</span>) || validText} 
                                </div>

                                <div className="changeFoto"> 
                                
                                    <label required htmlFor="imageL">
                                        <input autoFocus={ true } type="file" id="imageL" className="inputFile" name="foto" accept=".png, .jpg, .jpeg, .webp" 
                                            onChange={ getLogoImage } 
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
                    </div>

                        <h4>Реквізити:</h4>

                        <div className="companyDetails" >

                            <span>Телефон: </span> 
                                <TelephoneInput
                                    telClass={"inputEditProfile text"}
                                    telephone={newCompany.telephone}
                                    setNewItem={setNewCompany}
                                />

                            <span>Сайт компанії: </span> 

                            <input 
                                className="inputEditProfile text" 
                                type="text" 
                                name="companySite" 
                                placeholder={currentUser?.company?.companySite || "https://"}
                                onChange={(e) => getDataItems(e, { setNewDoc: setNewCompany, validate: true })}
                            />

                            <span>Telegram: </span> 

                            <input 
                                className="inputEditProfile text" 
                                type="text" 
                                name="telegram" 
                                placeholder={currentUser?.company?.telegram || "https://t.me/"}
                                onChange={(e) => getDataItems(e, { setNewDoc: setNewCompany, validate: true })}
                            />
                            
                        </div>

                        <div className="wrapBtns">

                            <button onClick={ goBack }>
                                НАЗАД
                            </button>

                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    fetchNewCompany()
                                }} 
                            >
                                {currentUser?.company?.companyName ? "ЗМІНИТИ" : "ДОДАТИ"}  
                            </button>

                        </div> 

                </form>
                    
            </div>
     
    )
}

export default CompanyForm;