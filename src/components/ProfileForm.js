import React, {useState}  from "react";
import { IoCameraSharp, IoCloseCircleSharp } from "react-icons/io5";
import GestAva from "./../img/GestAva.png";
import axios from "axios";


const ProfileForm = ({currentUser, host, getDataItems }) => {

    const [editeCandidate, setEditCandidate] = useState({
      firstName: "",
      lastName: "",
      email: "",
      documentId: "",
      foto: null, 
    });
    const [fileSize, setFileSize] = useState(''),
          [postFetch, setPostFetch] = useState(false),
          [postSuccess, setPostSuccess] = useState(null),
          [loading, setLoading] = useState(false),
          [error, setError] = useState(null),
          [openForm, setOpenForm] = useState(false);
    
    let avaMas, ava;
        if (currentUser.userImage.length > 0) {
          [ avaMas ] = currentUser.userImage;
          ava = ( host + avaMas.userAvatar.url );
        };
    const imageSrc = editeCandidate.foto instanceof File 
        && URL.createObjectURL(editeCandidate.foto);

    const getImage = (e) => {
        const file = e.target.files[0];
        if(file) {
            if ( file.size > 120 * 1024 ) {
            e.target.setCustomValidity('Розмір файла не повинен перевищувати 120 кВ');
            return;
            } else {
            setEditCandidate(prev => ({...prev, foto: file}));
            setFileSize( (file.size / 1024).toFixed(1));
            e.target.setCustomValidity('');
        } }   
    };
    // const data = {
    //   fullname: editeCandidate.firstName,
    //   userAvatar: editeCandidate.foto,
    //   username: editeCandidate.lastName,
    // };

    const fetchNewVacancy = async () => {
      
      setLoading(true);
      setPostFetch(true);
      try {    
          const file = new FormData();
          file.append('userAvatar', editeCandidate.foto);
          file.append('fullname', editeCandidate.firstName);

          const response = await axios.put(`${host}/api/users/${currentUser.id}`, file, {
            headers: {
              'Authorization': `Bearer ${currentUser.userJWT}`, 
            },
          });
        setPostSuccess(true);
        console.log('Данные пользователя обновлены:', response.data);
      } catch (error) {
        setError(error);
        console.error('Ошибка при обновлении данных:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };


    return (
        <form id="editProfile">
            <img className="profileImg" src={ currentUser.userImage.length < 1 ? GestAva : ava } alt="Гість"/>
              {openForm&&
                <div className="wrapPrevImage">
                  {editeCandidate.foto 
                    ? <img className="previewImg" width="50px" height="50px" src={ editeCandidate.foto && imageSrc } alt=""/>
                    : <div className="subImg" > </div>
                  }
                  <div className="changeFoto"> 
                    <label required htmlFor="imageF">
                      <input autoFocus={true} type="file" id="imageF" className="inputFile" name="foto" accept=".png, .jpg, .jpeg, .webp" 
                          onChange={getImage} 
                      />
                        <IoCameraSharp className="delete-icon"/>
                    </label>
                    <button className="delPrevImg" 
                     onClick = {(e) => {
                      e.preventDefault();
                      setEditCandidate(prev => ({...prev, foto: null}));
                    }}>
                      <IoCloseCircleSharp className="delete-icon"/>
                    </button>
                  </div>
                </div>
              }
              
              
              <br/><span>Ім'я: </span>
                {openForm
                ?(<input className="inputEditProfile text" type="text" name="firstName" placeholder={currentUser.userName || "Ваше ім'я"}
                  onChange={(e) => getDataItems(e, { setNewDoc: setEditCandidate, validate: true })}
                />)
                :(<p>{currentUser.userName || "Ваше ім'я"}</p>)}
              <span>Логін: </span>
                {openForm
                ?(<input className="inputEditProfile text" type="text" name="lastName" placeholder={currentUser.userLogin}
                  onChange={(e) => getDataItems(e, { setNewDoc: setEditCandidate, validate: true })}
                  />)
                :(<p>{currentUser.userLogin}</p>)}
              <span>Email: </span>
                {openForm
                ?(<input className="inputEditProfile mail" type="email" name="email" placeholder={currentUser.userEmail}
                  onChange={(e) => getDataItems(e, { setNewDoc: setEditCandidate, validate: true })}
                />)
                :(<p className="mail"> {currentUser.userEmail} </p>)}
              
                {openForm 
                ?(<div className="wrapBtns">
                  <button  
                    onClick={(e) => {
                      e.preventDefault();
                      setEditCandidate(prev => ({...prev, foto: null}));
                      setOpenForm(false)}
                    }
                  >НАЗАД
                  </button>
                  <button
                   onClick={(e) => {
                    e.preventDefault();
                    fetchNewVacancy()
                    }
                  }
                  >ЗМІНИТИ</button>
                </div>) 
                :(<button className="btnEditProfile" 
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenForm(true)}
                  }
                  >РЕДАГУВАТИ</button>)}

        </form>
    )
}
export default ProfileForm