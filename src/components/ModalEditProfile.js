import React from "react";
import Profile from "./Profile";
import useEsc from "./useEsc";
import useNoScroll from "./useNoScroll";
import './../css/ModalEditProfile.css';

const ModalEditProfile = ( { 
    currentUser,
    modalClass,
    showProfile,
    setShowProfile,
    host,
    getDataItems,
    axios,
    setCurrentUser,
    typeOfSearch
} ) => {


    useEsc(() => setShowProfile(false));
    useNoScroll(showProfile);

    return (
<div className={modalClass}>
    <div className="modalAddDoc">   
           <Profile
                setShowProfile={setShowProfile}
                currentUser={currentUser}
                host={host}
                getDataItems={getDataItems}
                axios={axios}
                setCurrentUser={setCurrentUser}
                typeOfSearch={typeOfSearch}
            />
             
    </div>

</div>
    );
}
export default ModalEditProfile;