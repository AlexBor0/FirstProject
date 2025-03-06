import React, {useState}  from "react";
import { IoCameraSharp } from "react-icons/io5";
import GestAva from "./../img/GestAva.png";


const ProfileForm = ({currentUser, host, getImage }) => {
     const altImg = "Гість";
      const [openForm, setOpenForm] = useState(false);
      let avaMas, ava;
      if (currentUser.userImage.length > 0) {
              [ avaMas ] = currentUser.userImage;
              ava = ( host + avaMas.userAvatar.url );
          }

    return (
<form id="editProfile">
            <img className="profileImg" src={ currentUser.userImage.length < 1 ? GestAva : ava } alt={ altImg }/>
              {openForm&&<div className="changeFoto"> 
                <label required htmlFor="imageF">
                  <input autoFocus={true} type="file" id="imageF" className="inputFile" name="foto" accept=".png, .jpg, .jpeg, .webp" 
                      onChange={getImage} 
                  />
                    <IoCameraSharp className="delete-icon"/>
                </label>
              </div>}
              
              <br/><span>Ім'я: </span>
                {openForm
                ?(<input className="inputEditProfile text" type="text" placeholder={currentUser.userName || "Ваше ім'я"}/>)
                :(<p>{currentUser.userName || "Ваше ім'я"}</p>)}
              <span>Логін: </span>
                {openForm
                ?(<input className="inputEditProfile text" type="text" placeholder={currentUser.userLogin}/>)
                :(<p>{currentUser.userLogin}</p>)}
              <span>Email: </span>
                {openForm
                ?(<input className="inputEditProfile mail" type="email" placeholder={currentUser.userEmail}/>)
                :(<p className="mail"> {currentUser.userEmail} </p>)}
              
                {openForm 
                ?(<div className="wrapBtns">
                  <button  
                    onClick={(e) => {
                      e.preventDefault();
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