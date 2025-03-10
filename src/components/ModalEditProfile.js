import React, {useState} from "react";
import Profile from "./Profile";
import useEsc from "./useEsc";
import useNoScroll from "./useNoScroll";
import './../css/ModalEditProfile.css';

const ModalEditProfile = ({ currentUser, modalClass, showProfile, setShowProfile, svgHttp, svgXlink, host, getDataItems}) => {

    const [fileSize, setFileSize] = useState('');

    const [editeCandidate, setEditCandidate] = useState({
            firstName: "",
            lastName: "",
            email: "",
            city: "",
            region: "",
            resume: "",
            documentId: "",
            foto: null, 
          });
    // console.log('Component rendered');
    const getImage = (e) => {
        const file = e.target.files[0];
        if(file) {
            if ( file.size > 120 * 1024 ) {
            e.target.setCustomValidity('Розмір файла не повинен перевищувати 120 кВ');
            return;
           } else {
            setEditCandidate(prev => ({...prev, foto: file}));
            setFileSize( (file.size / 1024).toFixed(1));
            e.target.setCustomValidity('');
        } }   
    };
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
                editeCandidate={editeCandidate}
                setEditCandidate={setEditCandidate}
                getDataItems={getDataItems}
            />
             
    </div>

</div>
    );
}
export default ModalEditProfile;