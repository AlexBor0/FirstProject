import React, {useEffect} from "react";
import Profile from "./Profile";

import './../css/ModalEditProfile.css';

const ModalEditProfile = ({ currentUser, modalClass, setShowProfile, svgHttp, svgXlink, host, getImage}) => {
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
                currentUser={currentUser}
                host={host}
                getImage={getImage}
            />
             
    </div>

</div>
    );
}
export default ModalEditProfile