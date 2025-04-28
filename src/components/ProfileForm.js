import React, {useState, useEffect}  from "react";
import { IoCameraSharp, IoCloseCircleSharp } from "react-icons/io5";
import GestAva from "./../img/GestAva.png";
import Spinner from "./Spinner";


const ProfileForm = ({currentUser, host, getDataItems, axios, setCurrentUser }) => {

    const [editeCandidate, setEditCandidate] = useState({
      firstName: "",
      lastName: "",
      email: "",
      documentId: "",
      foto: null, 
    });
    const [fileSize, setFileSize] = useState(''),
          [validText, setValidText] = useState(null),
          [loading, setLoading] = useState(false),
          [error, setError] = useState(null),
          [openForm, setOpenForm] = useState(false),
          [imageOpacity, setImageOpacity] = useState(1), // Новое состояние для прозрачности изображения
          [currentImageSrc, setCurrentImageSrc] = useState('');

    useEffect(() => {
      if (currentUser.userImage && currentUser.userImage.length > 0) {
        setCurrentImageSrc(host + currentUser.userImage[0].userAvatar.url);
      } else {
        setCurrentImageSrc(GestAva);
      }
    }, [currentUser.userImage, currentUser.changeFoto, host]);

    const imageSrc = editeCandidate.foto instanceof File 
        && URL.createObjectURL(editeCandidate.foto);

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
            setEditCandidate(prev => ({...prev, foto: file}));
            setFileSize( (file.size / 1024).toFixed(1));
            e.target.setCustomValidity('');
        } }   
    };

    const deleteImage = (e) => {
      e.preventDefault();
      setEditCandidate(prev => ({...prev, foto: null}));
      setFileSize(null);
      setValidText("");
    };

    const goBack = (e) => {
      e.preventDefault();
      setEditCandidate(prev => ({...prev, foto: null}));
      setOpenForm(false);
      setFileSize('')
    };

    const changeProfile = (e) => {
      e.preventDefault();
      fetchUpdateProfile();
      setOpenForm(false);
    };

    const editeProfile = (e) => {
      e.preventDefault();
      setOpenForm(true);
      setEditCandidate(prev => ({...prev, 
        foto: null,
        firstName: null,
      }));
    }
   
    const fetchUpdateProfile = async () => {

      let newAvatarId = null;
      try {  
        if(editeCandidate.foto) {
          let imageIdToDelete = currentUser?.userImage?.[0]?.userAvatar?.id || null;

          setLoading(true);
          setImageOpacity(0);
      
            let newAvatarUrl = null; 
            if (editeCandidate.foto) {
              const formDataToSend = new FormData();
              formDataToSend.append("files", editeCandidate.foto);
              formDataToSend.append("ref", "plugin::users-permissions.user"); 
              formDataToSend.append("refId", currentUser.id); 
              formDataToSend.append("field", "userAvatar");
    
              const uploadResponse = await fetch(`${host}/api/upload`, {
                  method: "POST",
                  headers: {
                    'Authorization': `Bearer ${currentUser.userJWT}`,
                  },
                  body:formDataToSend,
                }
              );
    
              if (!uploadResponse.ok) {
                throw new Error("Помилка при завантаженні файлу");
              } else if(!imageIdToDelete){
                setCurrentUser((prev) => ({...prev, changeFoto: true}));
              }
    
              const uploadData = await uploadResponse.json();
              newAvatarUrl = host + uploadData[0].url;
              newAvatarId = uploadData[0].id; 
              console.log("Файл успішно завантажено");
            };
    
            if (newAvatarUrl) {
              const img = new Image();
              img.onload = () => {
                setCurrentImageSrc(newAvatarUrl);
                setTimeout(() => setImageOpacity(1), 300);
              };
              img.src = newAvatarUrl;
            };
            setFileSize(null);
            if (imageIdToDelete&&editeCandidate.foto) {
              const deletePrevImage = await axios.delete(
                `${host}/api/upload/files/${imageIdToDelete}`,
                {
                  headers: {
                    Authorization: `Bearer ${currentUser.userJWT}`,
                  },
                }
              );
      
              if (deletePrevImage.status !== 200) {
                throw new Error("Помилка при видаленні старого файлу");
              } else {
                setCurrentUser((prev) => ({...prev, changeFoto: true}))
              };
            };
          
            setCurrentUser((prev) => ({
              ...prev,
              userImage: newAvatarUrl
                      ? [{ userAvatar: {
                        url: newAvatarUrl,
                        id: newAvatarId,
                      } }]
                      : prev.userImage,
            }));

        };

        if(editeCandidate.firstName) {
          const userData = {
            fullname: editeCandidate.firstName || currentUser.userName,
          };

        const updateResponse = await axios.put(
          `${host}/api/users/${currentUser.id}`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${currentUser.userJWT}`,
            },
          }
        );

        if (updateResponse.status !== 200) {
          throw new Error("Помилка при оновленні даних користувача");
        } else {
          setCurrentUser((prev) => ({...prev, userName: userData.fullname}));

        };
        }

        console.log('Дані користувача оновлено:');

      } catch (error) {
        setError(error);
        console.error('Помилка:', error.message);
        setImageOpacity(1);
      } finally {
        setLoading(false);
      }
    };

    return (
        <form id="editProfile">
          <div className="profileImgWrap">
            {loading
            ?
              (<Spinner className="profileImg"/>)
            : (
                <img 
                  className={`profileImg ${loading ? 'loading' : 'loaded'}`}
                  src={currentImageSrc} 
                  alt="Профіль"
                  style={{ opacity: imageOpacity }}
                />    
              )}
             
          </div>
              {openForm&&
                <div className="wrapPrevImage">
                  {editeCandidate.foto 
                    ? <img className="previewImg" width="50px" height="50px" src={ editeCandidate.foto && imageSrc } alt=""/>
                    : <div className="subImg" > {validText} </div>
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
              }    
              <br/><span>Ім'я: </span> <span className="fileSize">{fileSize&&openForm&&( fileSize + "kb")}</span>
                {openForm
                  ?(<input className="inputEditProfile text" type="text" name="firstName" placeholder={currentUser.userName || "Ваше ім'я"}
                    onChange={(e) => getDataItems(e, { setNewDoc: setEditCandidate, validate: true })}
                    />)
                  :(<p>{currentUser.userName || "Ваше ім'я"}</p>)
                }
                <span>Логін: </span>
                  <p>{currentUser.userLogin}</p>
                <span>Email: </span>
                <p className="mail"> {currentUser.userEmail} </p>

                {openForm 
                  ?(<div className="wrapBtns">
                      <button onClick={ goBack }>
                        НАЗАД
                      </button>
                      <button onClick={ changeProfile }>
                        ЗМІНИТИ
                      </button>
                    </div>) 
                  :(<button className="btnEditProfile" onClick={ editeProfile } >
                      РЕДАГУВАТИ
                    </button>)
                }
        </form>
    )
}
export default ProfileForm