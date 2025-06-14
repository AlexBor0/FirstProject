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
    type
} ) => {


    useEsc(() => setShowProfile(false));
    useNoScroll(showProfile);

    return (
<div className={modalClass}>
    <div className="modalProfile">   
           <Profile
                setShowProfile={setShowProfile}
                currentUser={currentUser}
                host={host}
                getDataItems={getDataItems}
                axios={axios}
                setCurrentUser={setCurrentUser}
                type={type}
            />
             
    </div>

</div>
    );
}
export default ModalEditProfile;