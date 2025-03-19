import React from "react";
import Profile from "./Profile";
import useEsc from "./useEsc";
import useNoScroll from "./useNoScroll";
import './../css/ModalEditProfile.css';

const ModalEditProfile = ({ currentUser, modalClass, showProfile, setShowProfile, svgHttp, svgXlink, host, getDataItems, axios, setCurrentUser}) => {


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
                getDataItems={getDataItems}
                axios={axios}
                setCurrentUser={setCurrentUser}
            />
             
    </div>

</div>
    );
}
export default ModalEditProfile;