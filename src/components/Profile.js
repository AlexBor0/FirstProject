import React from "react";
import { IoCloseCircleSharp, IoCameraSharp } from "react-icons/io5";
import GestAva from "./../img/GestAva.png";

const Profile = ({ svgHttp, svgXlink, setShowProfile, host, currentUser }) => {
  const altImg = "Гість";
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
            <g>
              <path className="fil7 str4" d="M348 496l134 0c1,0 2,1 2,2l0 5c0,1 -1,2 -2,2l-134 0c-1,0 -2,-1 -2,-2l0 -5c0,-1 1,-2 2,-2z"/>
              <path className="fil8 str5" d="M348 496l65 0c1,0 2,1 2,2l0 5c0,1 -1,2 -2,2l-65 0c-1,0 -2,-1 -2,-2l0 -5c0,-1 1,-2 2,-2z"/>
            </g>
          </g>
        </svg>
                 
          <div className="pageOne">
            <div className="profileHead" >ВАШ ПРОФІЛЬ
            </div>
            <img className="profileImg" src={ currentUser.userImage.length < 1 ? GestAva : ava } alt={ altImg }/>
            <button className="changeFoto"
            > 
              <IoCameraSharp className="delete-icon"/>
            </button>
            
            <br/><span>Ім'я: </span>
            <p>{currentUser.userName || "Ваше ім'я"}</p>
            <span>Логін: </span>
            <p>{currentUser.userLogin}</p>
            <span>Email: </span>
            <p className="mail"> {currentUser.userEmail} </p>
            
          </div>
          <div className="pageTwo">
          <IoCloseCircleSharp className="delete-icon" onClick = {() => setShowProfile(false)}/>
          </div>
      </div>
    )
}
export default Profile