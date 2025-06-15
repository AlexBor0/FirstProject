import ProfileForm from "./ProfileForm";
import { IoCloseCircleSharp } from "react-icons/io5";

const PageOne = ( { 
    currentUser,
    host,
    getDataItems,
    axios,
    setCurrentUser,
    setShowProfile
} ) => {


    return (
        <div className="pageOne">
            <button 
                className="pageBtn" 
                autoFocus={true} 
                onClick = {(e) => { e.preventDefault(); setShowProfile(false) }}
            >
                <IoCloseCircleSharp className="delete-icon" />
            </button>

            <div className="profileHead" >
                ПРОФІЛЬ
            </div>
            <ProfileForm
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                host={host} 
                getDataItems={getDataItems}
                axios={axios}
            />      
        </div>
    )
}
export default PageOne;