import React, {useState}  from "react";
import { IoCameraSharp } from "react-icons/io5";
import GestAva from "./../img/GestAva.png";
import { IoCloseCircleSharp } from "react-icons/io5";


const ProfileForm = ({currentUser, host, getImage, setEditCandidate, editeCandidate, getDataItems }) => {
        const altImg = "Гість";
        const [openForm, setOpenForm] = useState(false);
        let avaMas, ava;
            if (currentUser.userImage.length > 0) {
              [ avaMas ] = currentUser.userImage;
              ava = ( host + avaMas.userAvatar.url );
            };
        const imageSrc = editeCandidate.foto instanceof File 
        && URL.createObjectURL(editeCandidate.foto);

    return (
        <form id="editProfile">
            <img className="profileImg" src={ currentUser.userImage.length < 1 ? GestAva : ava } alt={ altImg }/>
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
                      <IoCloseCircleSharp className="delete-icon"
                       
/>
                    </button>
                  </div>
                </div>
              }
              
              
              <br/><span>Ім'я: </span>
                {openForm
                ?(<input className="inputEditProfile text" type="text" placeholder={currentUser.userName || "Ваше ім'я"}
                  onChange={(e) => getDataItems(e, { setNewDoc: setEditCandidate, validate: true })}
                />)
                :(<p>{currentUser.userName || "Ваше ім'я"}</p>)}
              <span>Логін: </span>
                {openForm
                ?(<input className="inputEditProfile text" type="text" placeholder={currentUser.userLogin}
                  onChange={(e) => getDataItems(e, { setNewDoc: setEditCandidate, validate: true })}
                />)
                :(<p>{currentUser.userLogin}</p>)}
              <span>Email: </span>
                {openForm
                ?(<input className="inputEditProfile mail" type="email" placeholder={currentUser.userEmail}
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