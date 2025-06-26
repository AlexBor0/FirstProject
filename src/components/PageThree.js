import DetailsPage from "./DetailsPage";
import ResponsesPage from "./ResponsesPage";
import { IoCloseCircleSharp, IoArrowUndo } from "react-icons/io5";

const PageThree = ( { 
    currentUser,
    host,
    getDataItems,
    axios,
    setCurrentUser,
    setShowProfile,
    type,
    flipPage,
    sPB = false
} ) => {

    return (
       <div className="pageThree">
                <button 
                    className="pageBtn" 
                    autoFocus={true} 
                    onClick = {() => { setShowProfile(false) }}
                >
                    <IoCloseCircleSharp className="delete-icon" />
                </button>
              <div className="profileHead" >
              { type? "РЕКВІЗИТИ": "МОЇ ВІДГУКИ" }
              </div>
              <div className="currentEntries">
                { type
                  ? <DetailsPage
                      currentUser={currentUser}
                      getDataItems={getDataItems}
                      setCurrentUser={setCurrentUser}
                      axios={axios}
                      host={host}
                    /> 
                  : <ResponsesPage/> }
              </div>
              <button className="pageBtn" onClick={flipPage}>
                <IoArrowUndo  className="redo-icon"/> 
              </button>     
            </div>
    )
}
export default PageThree;