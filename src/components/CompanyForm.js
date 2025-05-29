import {useState, useEffect}  from "react";
import { IoCameraSharp, IoCloseCircleSharp} from "react-icons/io5";
import { IoIosRemoveCircleOutline, IoIosAddCircleOutline } from "react-icons/io";
import TelephoneInput from "./TelephoneInput";
import CompanyLogo from "./CompanyLogo";



const CompanyForm = ( {
    currentUser,
    getDataItems,
    axios,
    host,
    newCompany,
    setNewCompany,
    resetNewCompany,
    setLoading,
    setPostSuccess,
    setPostFetch,
    setOpenForm,
    setIsPrev,
    addTelephone,
    setAddTelephone
} ) => {

    const [fileSize, setFileSize] = useState(''),
          [failUpload, setFailUpload] = useState(null),
          [error, setError] = useState(null),
          [showPrompt, setShowPrompt] = useState(false),
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
            setNewCompany(resetNewCompany());
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

        let newFotoId = null;

        const fetchNewCompany = async () => {
            if(newCompany.logo) {

                    let logoIdToDelete = currentUser?.company?.logo?.id || null;
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
                newFotoId = imageResponse?.data[0].id;
            
                if (logoIdToDelete && newFotoId) {

                    const deletePrevImage = await axios.delete(
                        `${host}/api/upload/files/${logoIdToDelete}`,
                        {
                        headers: {
                            'Authorization': `Bearer ${currentUser.userJWT}`,
                        },
                        }
                    );
        
                    if (deletePrevImage.status !== 200) {
                        throw new Error("Помилка при видаленні старого файлу");
                    } 

                };

            };

            const name = currentUser?.company?.companyName;
            const docId = currentUser?.company?.documentId;


        
            const data = {
                ...(newCompany?.companyName && { companyName: newCompany?.companyName}),
                ...(newFotoId && { logo: newFotoId }),
                ...(newCompany?.telephone && newCompany.telephone.replace(/\D/g, '').length > 4 && { 
                        telephone: newCompany.telephone.replace(/\D/g, '') 
                    }),
                ...(newCompany?.telephone2 && newCompany.telephone2.replace(/\D/g, '').length > 4 && { 
                        telephone2: newCompany.telephone2.replace(/\D/g, '') 
                    }),
                ...(newCompany?.telephone3 && newCompany.telephone3.replace(/\D/g, '').length > 4 && { 
                        telephone3: newCompany.telephone3.replace(/\D/g, '') 
                    }),
                ...(newCompany?.companyEmail && { companyEmail: newCompany.companyEmail }),
                ...(newCompany?.companySite && { companySite: newCompany.companySite }),
                ...(newCompany?.telegram && { telegram: newCompany.telegram }),
                user: {connect: [currentUser.id] },
            };
            

        if (data) {

        }
            const response = await apiRequest(() => 
                    name 
                        ? axios.put(`${host}/api/companies${'/' + docId}`, { data }, {
                            headers: { 
                            'Authorization': `Bearer ${currentUser.userJWT}`,
                            'Content-Type': 'application/json' 
                            },
                        })
                        : axios.post(`${host}/api/companies`, { data }, {
                            headers: { 
                            'Authorization': `Bearer ${currentUser.userJWT}`,
                            'Content-Type': 'application/json' 
                            },
                        })
                );

           if (response && response.status >= 200 && response.status < 300) {

    }
    
    if (response && (response.status >= 400 || !response.data)) {
        setFailUpload(true);
    }
    if(error) {
        console.log(error.message)
    }
};
        
        useEffect ((newFotoId) => {
            if (failUpload) {
            const fetchDeleteImage = async () => {
                const deletePrevImage = await axios.delete(
                `${host}/api/upload/files/${newFotoId}`,
                {
                    headers: {
                    Authorization: `Bearer ${currentUser.userJWT}`,
                    },
                }  
                );
                if (deletePrevImage.status !== 200) {
                throw new Error("Помилка при видаленні відправленого файлу");
                };
            };
            fetchDeleteImage();
            }     
        }, [currentUser.userJWT, host, axios, failUpload]);

       useEffect(() => {
        
        if (newCompany.telephone && newCompany.telephone.replace(/\D/g, '').length >= 10) {
            if (!addTelephone) {
                setAddTelephone(1);
            }
        } else if (!newCompany.telephone || newCompany.telephone.replace(/\D/g, '').length < 4) {
            
            if (addTelephone > 1) {
                setAddTelephone(false);
                setNewCompany(prev => ({
                    ...prev,
                    telephone2: '',
                    telephone3: ''
                }));
            }
        }
    }, [newCompany.telephone, addTelephone, setAddTelephone, setNewCompany]);

    const resetTelephone = (e) => {
        e.preventDefault();
        const newCount = addTelephone - 1;
        setAddTelephone(newCount);
        
        
        if (newCount === 1) {
            setNewCompany(prev => ({...prev, telephone3: ''}));
        } else if (newCount === false) {
            setNewCompany(prev => ({
                ...prev, 
                telephone2: '',
                telephone3: ''
            }));
        }
    };

    return (         
           
            <div className="companyForm">

                <form 
                    id="editCompany"
                    onSubmit={
                        (e) => {
                            e.preventDefault();
                            fetchNewCompany()
                        }
                    }
                 
                >

                    <input 
                        required={currentUser?.company?.companyName ? false : true}
                        className="inputEditProfile text" 
                        type="text" 
                        name="companyName"
                        minLength="3" 
                        maxLength="25" 
                        placeholder={currentUser?.company?.companyName || "Назва компанії"}
                        onChange={(e) => getDataItems(e, {
                             setNewDoc: setNewCompany, 
                             validate: true,
                             exceptions: ['"', '.']
                            })}
                        
                    />
                        
                    <div className="wrapLogoImageForm">
                        {(newCompany.logo) 
                        ? <img className="previewImg" width="60px" height="60px" src={ newCompany.logo && imageSrc } alt="Новий логотип компанії"/>
                        : (currentUser?.company?.logo?.url &&
                            <img 
                                className="previewImg" 
                                width="60px" 
                                height="60px" 
                                src={ host + currentUser.company.logo.formats.thumbnail.url} 
                                alt="Логотип компанії"/>
                            ) 
                        ||
                            (    <div className="subImgComp" width="60px" height="60px"> 
                                
                                    <CompanyLogo 
                                        wordOne="ЛОГО"
                                    />
                            
                                </div>
                            )
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
                                            autoFocus={ true }
                                            onClick={ deleteImage }>
                                        <IoCloseCircleSharp className="delete-icon"/>
                                    </button>

                                </div>

                            </div>
                    </div>

                        <h4>Реквізити:</h4>

                        <div className="companyDetails" >

                            <span>Телефон: </span> 
                            {addTelephone && addTelephone < 3 &&

                                <button 
                                    className="addTelBtn"
                                    data-prompt="add"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setAddTelephone(prev => prev + 1);
                                    }}
                                    onMouseOver={(e) => setShowPrompt(e.currentTarget.dataset.prompt)}
                                    onMouseLeave={() => setShowPrompt(null)}
                                    
                                >
                                    <IoIosAddCircleOutline />
                                    {showPrompt === "add" && <span className="addTelPrompt">Додати ще телефон</span>}
                                </button>
                            }
                            {addTelephone && addTelephone >= 2  &&

                                <button 
                                    className={"addTelBtn" + (addTelephone === 3 ? " onlyRemove" : "")}
                                    data-prompt="remove"
                                    onClick={resetTelephone}
                                    onMouseOver={(e) => setShowPrompt(e.currentTarget.dataset.prompt)}
                                    onMouseLeave={() => setShowPrompt(null)}
                                >
                                    <IoIosRemoveCircleOutline />
                                    {showPrompt === "remove" && <span className="addTelPrompt">Видалити телефон</span>}
                                </button>
                            }
                                <TelephoneInput
                                    telClass={"inputEditProfile text"}
                                    telephone={newCompany.telephone}
                                    setNewItem={setNewCompany}
                                    currentUser={currentUser}
                                    fieldName="telephone"
                                    telephoneKey="telephone"
                                />

                            { addTelephone && addTelephone >= 2 &&
                              <>
                                    <span>Телефон 2: </span>  
                                        <TelephoneInput
                                            telClass={"inputEditProfile text"}
                                            telephone={newCompany.telephone2}
                                            setNewItem={setNewCompany}
                                            currentUser={currentUser}
                                            fieldName="telephone2"
                                            telephoneKey="telephone2"
                                        />
                                </>
                            }
                            {  addTelephone && addTelephone === 3 && 
                                <>
                                    <span>Телефон 3: </span>  
                                        <TelephoneInput
                                            telClass={"inputEditProfile text"}
                                            telephone={newCompany.telephone3}
                                            setNewItem={setNewCompany}
                                            currentUser={currentUser}
                                            fieldName="telephone3"
                                            telephoneKey="telephone3"
                                        />
                                </>
                            }

                            <span>E-mail: </span> 

                            <input 
                                className="inputEditProfile text" 
                                type="text" 
                                name="companyEmail" 
                                placeholder={currentUser?.company?.companyEmail || "example@mail.com"}
                                onChange={(e) => getDataItems(e, {
                                     setNewDoc: setNewCompany,
                                     validate: true,
                                     exceptions: ['.']
                                    })}
                            />

                            <span>Сайт компанії: </span> 

                            <input 
                                className="inputEditProfile text" 
                                type="text" 
                                name="companySite" 
                                placeholder={currentUser?.company?.companySite || "https://"}
                                onChange={(e) => getDataItems(e, {
                                     setNewDoc: setNewCompany,
                                     validate: true,
                                     exceptions: [':', '/', '.']
                                    })}
                            />

                            <span>Telegram: </span> 

                            <input 
                                className="inputEditProfile text" 
                                type="text" 
                                name="telegram" 
                                placeholder={currentUser?.company?.telegram || "https://t.me/"}
                                onChange={(e) => getDataItems(e, {
                                     setNewDoc: setNewCompany,
                                     validate: true,
                                     exceptions: [':', '/', '.']
                                    })}
                            />
                            
                        </div>

                        <div className="wrapBtns">

                            <button onClick={ goBack }>
                                НАЗАД
                            </button>

                            <button>
                                {currentUser?.company?.companyName ? "ЗМІНИТИ" : "ДОДАТИ"}  
                            </button>

                        </div> 

                </form>
                    
            </div>
     
    )
}

export default CompanyForm;