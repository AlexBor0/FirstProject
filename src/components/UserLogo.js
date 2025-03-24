import React, { useEffect, useState } from "react";
import GestAva from "./../img/GestAva.png";

const UserLogo = ({host, setShowProfile, currentUser, setRegEntry})=> {
    const altImg = "Гість";
   const [currentImageSrc, setCurrentImageSrc] = useState('');

    useEffect(() => { 
        if (currentUser.userImage && currentUser.userImage.length > 0) {
            setCurrentImageSrc(host + currentUser.userImage[0].userAvatar.url);
          } else {
            setCurrentImageSrc(GestAva);
          }
        // let avaMas;  
        // if (currentUser.userImage.length > 0) {
        //     [ avaMas ] = currentUser.userImage;
        //     setAva( host + avaMas.userAvatar.url );
        // }
    }, [currentUser.userImage, currentUser.changeFoto, host])


    return(
        <button className="Userlogo"
            onClick={() => {
                currentUser.docId
                ? setShowProfile(true)
                : setRegEntry(true);
            }}
        >
         <img src={ currentImageSrc } alt={ altImg }/>
         <p style={{
            margin: "-5px 0px 0px 0px ",
            fontSize: "12px",
            textAlign: "center"
         }}>{ !currentUser.userName ? "Гість" : currentUser.userName }</p>   
        </button>

    )
}
export default UserLogo