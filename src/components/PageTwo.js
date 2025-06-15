import CompanyPage from "./CompanyPage";
import BillBoard from "./BillBoard";
import { IoCloseCircleSharp, IoArrowRedo} from "react-icons/io5";


const PageTwo = ( { 
    currentUser,
    host,
    getDataItems,
    axios,
    setCurrentUser,
    type,
    setShowProfile,
    flipPage

} ) => {


    return (
        <div className="pageTwo">
                      <button 
                        className="pageBtn" 
                        autoFocus={true} 
                        onClick = {(e) => { e.preventDefault(); setShowProfile(false) }}
                      >
                        <IoCloseCircleSharp className="delete-icon" />
                      </button>
                      <div className="profileHead" >
                        { type? "КОМПАНІЯ": "РОБОТА"}
                      </div>
                      <div  className="currentEntries">
                      { type
                      ? <CompanyPage
                          currentUser={currentUser}
                          getDataItems={getDataItems}
                          setCurrentUser={setCurrentUser}
                          axios={axios}
                          host={host}
                        /> 
                      : <BillBoard/> }
                      </div>
                      <button className="pageBtn" onClick={flipPage}>
                        <IoArrowRedo className="redo-icon"/> 
                      </button>                
                    </div>
    )
}
export default PageTwo;