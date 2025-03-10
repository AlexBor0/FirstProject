import React from "react";
import Profile from "./Profile";
import useEsc from "./useEsc";
import useNoScroll from "./useNoScroll";
import './../css/ModalEditProfile.css';

const ModalEditProfile = ({ currentUser, modalClass, showProfile, setShowProfile, svgHttp, svgXlink, host, getImage}) => {
    // console.log('Component rendered');
    useEsc(() => setShowProfile(false));
    useNoScroll(showProfile);

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