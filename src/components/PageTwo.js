import CompanyPage from "./CompanyPage";
import BillBoard from "./BillBoard";
import { IoCloseCircleSharp, IoArrowRedo, IoArrowUndo} from "react-icons/io5";


const PageTwo = ( { 
    currentUser,
    host,
    getDataItems,
    axios,
    setCurrentUser,
    type,
    setShowProfile,
    flipPage,
    sPB = false
  
} ) => {


    return (
      <div className="pageTwo">
        <button 
          className="pageBtn" 
          autoFocus={true} 
          onClick = {() => { setShowProfile(false) }}
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
          {  sPB 
            ? <IoArrowUndo className="redo-icon" /> 
            : <IoArrowRedo className="redo-icon" />}
        </button>                
      </div>
    )
}
export default PageTwo;