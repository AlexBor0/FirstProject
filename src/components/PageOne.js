import ProfileForm from "./ProfileForm";
import { IoCloseCircleSharp, IoArrowUndo } from "react-icons/io5";

const PageOne = ( { 
    currentUser,
    setCurrentUser,
    host,
    getDataItems,
    axios,
    setShowProfile,
    flipPage,
    sPB = false
} ) => {


    return (
        <div className="pageOne">
            <button 
                className="pageBtn" 
                autoFocus={true} 
                onClick = {() => { setShowProfile(false) }}
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
            <button 
                className="pageBtn" 
                onClick={flipPage}
            >
                <IoArrowUndo className="redo-icon"/> 
            </button>     
        </div>
    )
}
export default PageOne;