import React from "react";
import Profile from "./Profile";
import useEsc from "./useEsc";
import './../css/ModalEditProfile.css';

const ModalEditProfile = ({ currentUser, modalClass, setShowProfile, svgHttp, svgXlink, host, getImage}) => {

    useEsc(() => setShowProfile(false));

    return (
<div className={modalClass}>
    <div className="modalAddDoc">   
            <Profile
                svgHttp={svgHttp}
                svgXlink={svgXlink}
                setShowProfile={setShowProfile}
                currentUser={currentUser}
                host={host}
                getImage={getImage}
            />
             
    </div>

</div>
    );
}
export default ModalEditProfile