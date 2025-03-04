import React from "react";
import GestAva from "./../img/GestAva.png";

const UserLogo = ({host, setShowProfile, currentUser})=> {
    const altImg = "Гість";
    let avaMas, ava;
    if (currentUser.userImage.length > 0) {
            [ avaMas ] = currentUser.userImage;
            ava = ( host + avaMas.userAvatar.url );
        }
    
    return(
        <button className="Userlogo"
            onClick={() => setShowProfile(true)}
        >
         <img src={ currentUser.userImage.length < 1 ? GestAva : ava } alt={ altImg }/>
         <p style={{
            margin: "-5px 0px 0px 0px ",
            fontSize: "12px",
            textAlign: "center"
         }}>{ !currentUser.userName ? "Гість" : currentUser.userName }</p>   
        </button>

    )
}
export default UserLogo