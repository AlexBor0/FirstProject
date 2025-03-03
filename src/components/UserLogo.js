import React from "react";
import GestAva from "./../img/GestAva.png";

const UserLogo = ({userNameLogo = "Гість", userImage, host, setShowProfile})=> {
    const altImg = "Гість";
    let avaMas, ava;
    if (userImage.length > 0) {
            [ avaMas ] = userImage;
            ava = ( host + avaMas.userAvatar.url );
        }
    
    return(
        <button className="Userlogo"
            onClick={() => setShowProfile(true)}
        >
         <img src={ userImage.length < 1 ? GestAva : ava } alt={ altImg }/>
         <p style={{
            margin: "-5px 0px 0px 0px ",
            fontSize: "12px",
            textAlign: "center"
         }}>{ !userNameLogo ? "Гість" : userNameLogo }</p>   
        </button>

    )
}
export default UserLogo