import ConfirmModal from "./ConfirmModal";
import FormatDate from './FormatDate';
import { IoCloseCircleSharp, IoCreate, IoEyeSharp, IoTrash, IoArrowUndo} from "react-icons/io5";

const PageFour = ( {
    currentDoc, 
    currentUser,
    showDocList,
    setShowProfileBook,
    backward,
    type,
    setShowProfile,
    showConfirmModal,
    indexDoc,
    deleteDocument,
    setShowDoc,
    typeBtn,
    openModal,
    flipPage = null,
    sPB = false
} ) => {


    return (
         <div className="pageFour">
              <button 
                className="pageBtn" 
                autoFocus={true} 
                onClick = {() => { setShowProfile(false) }}>
                <IoCloseCircleSharp className="delete-icon" />
              </button>
              <div className="profileHead" >
                { type? "МОЇ ВАКАНСІЇ": "МОЇ РЕЗЮМЕ"}
              </div>
              <div  className="currentEntries">

                {/* Модальное окно подтверждение */}
                {showConfirmModal&& 
                  <ConfirmModal
                    currentUser={currentUser}
                    indexDoc={indexDoc}
                    deleteDocument={deleteDocument}
                    setShowDoc={setShowDoc}
                    typeBtn={typeBtn}
                    backward={backward}
                    setShowProfileBook={setShowProfileBook}
                    document={type ? "вакансію" : "резюме"}
                  />
                }

                {showDocList&& (<ol >
                  {currentDoc.map((el,index) => (
                    <li key={index}>
                      <h4>{el.title}</h4>
                      <p><data>Створено: <FormatDate isoDate={el.createdAt} /></data></p>
                      <p><span>Оглянуто: (0)</span></p>
                      <p><span>Відгуки: (0)</span>
                      <button className="pageBtn item" data-type="del" onClick = {(e) => openModal(e,index)}>
                        <IoTrash  className="del-icon" />
                      </button>
                      <button className="pageBtn item" data-type="edit" onClick = {(e) => openModal(e,index)}>
                        <IoCreate className="edit-icon"/>
                      </button>
                      <button className="pageBtn item" data-type="view" onClick = {(e) => openModal(e,index)}>
                        <IoEyeSharp className="view-icon" />
                      </button>
                      </p>
                    </li>
                    ))  
                  } 
                </ol>)}
              </div>
              {flipPage && <button className="pageBtn" onClick={flipPage}>
                <IoArrowUndo className="redo-icon"/> 
              </button>}
                              
            </div>
    )
}
export default PageFour;