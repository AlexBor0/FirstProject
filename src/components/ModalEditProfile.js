import React, {useEffect, useState} from "react";
import Profile from "./Profile";

import './../css/ModalEditProfile.css';

const ModalEditProfile = ({modalClass, setShowProfile, svgHttp, svgXlink, userImage, host}) => {
        useEffect(() => {
                const handlKeyDown = (e) => {
                    e.key === 'Escape'&&setShowProfile(false)
                }
                    
                document.addEventListener('keydown', handlKeyDown);
              
                return () => {
                  document.removeEventListener('keydown', handlKeyDown);
                };
              });
    return (
<div className={modalClass}>
    <div className="modalAddDoc">   
            <Profile
                svgHttp={svgHttp}
                svgXlink={svgXlink}
                setShowProfile={setShowProfile}
                userImage={userImage}
                host={host}
            />
             
    </div>

</div>
    );
}
export default ModalEditProfile