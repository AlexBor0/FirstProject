import React, {useState}  from "react";
import { IoCloseCircleSharp, IoCameraSharp } from "react-icons/io5";
import GestAva from "./../img/GestAva.png";

const Profile = ({ svgHttp, svgXlink, setShowProfile, host, currentUser, getImage }) => {
  const altImg = "Гість";
  const [openForm, setOpenForm] = useState(false);
  let avaMas, ava;
  if (currentUser.userImage.length > 0) {
          [ avaMas ] = currentUser.userImage;
          ava = ( host + avaMas.userAvatar.url );
      }
    return(
      <div className="profileBook">
        <svg
          xmlns= {svgHttp}
          xmlSpace="preserve"
          width="470px"
          height="372px"
          version="1.1"
          style={{
            shapeRendering: "geometricPrecision",
            textRendering: "geometricPrecision",
            imageRendering: "optimizeQuality",
            fillRule: "evenodd",
            clipRule: "evenodd"
          }}
          viewBox="55 245 500 230"
          xmlnsXlink={svgXlink}
        >
          <defs>
            <style type="text/css">
              {`
                .str5 {stroke:#B87333;stroke-miterlimit:22.9256}
                .str3 {stroke:#035774;stroke-width:2;stroke-miterlimit:22.9256}
                .str0 {stroke:#035774;stroke-width:9;stroke-miterlimit:22.9256}
                .str4 {stroke:#B87333;stroke-width:2;stroke-miterlimit:22.9256}
                .str2 {stroke:black;stroke-width:9;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:22.9256}
                .str1 {stroke:#035774;stroke-width:9;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:22.9256}
                .fil3 {fill:#E31E24}
                .fil0 {fill:#177F8A}
                .fil1 {fill:#C4E0D6}
                .fil2 {fill:#FCFCE6}
                .fil4 {fill:#104B5D;fill-rule:nonzero}
                .fil6 {fill:#177F8A;fill-rule:nonzero}
                .fil5 {fill:#9CC7D0;fill-rule:nonzero}
                .fil8 {fill:#A73333;fill-rule:nonzero}
                .fil7 {fill:white;fill-rule:nonzero}
              `}
            </style>
          </defs>
          <g id="Слой_x0020_1">
            <rect className="fil0 str0" x="76" y="208" width="461" height="332" rx="13" ry="13"/>
            <g>
              <path className="fil1 str1" d="M294 533c-3,-21 -25,-22 -41,-22l-128 0c-30,0 -25,4 -25,-39 0,-19 1,-256 0,-268 0,-20 0,-25 16,-25 48,0 97,0 145,0 25,0 29,8 41,20l0 334 -9 0z"/>
              <path className="fil1 str1" d="M318 533c3,-21 25,-22 41,-22l128 0c30,0 25,4 25,-39 0,-19 -1,-256 0,-268 0,-20 0,-25 -16,-25 -48,0 -97,0 -145,0 -25,0 -29,8 -41,20l0 334 9 0z"/>
            </g>
            <rect className="fil2" x="330" y="204" width="164" height="290" rx="19" ry="19"/>
            <path className="fil3 str2" d="M374 240c7,-5 13,-10 19,-13 5,4 12,8 19,13 5,4 7,0 7,-2l0 -59 -52 0 0 59c0,2 2,6 7,2z"/>

            <rect className="fil2" x="118" y="204" width="164" height="290" rx="19" ry="19"/>

          </g>
        </svg>
                 
          <div className="pageOne">
            <div className="profileHead" >ВАШ ПРОФІЛЬ
            </div>
            
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
                ?(<input className="inputEditProfile" type="text" placeholder={currentUser.userName || "Ваше ім'я"}/>)
                :(<p>{currentUser.userName || "Ваше ім'я"}</p>)}
              <span>Логін: </span>
                {openForm
                ?(<input className="inputEditProfile" type="text" placeholder={currentUser.userLogin}/>)
                :(<p>{currentUser.userLogin}</p>)}
              <span>Email: </span>
                {openForm
                ?(<input className="inputEditProfile " type="email" placeholder={currentUser.userEmail}/>)
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
            
          </div>
          <div className="pageTwo">
          <IoCloseCircleSharp className="delete-icon" onClick = {() => setShowProfile(false)}/>
          </div>
      </div>
    )
}
export default Profile