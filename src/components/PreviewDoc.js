import ResumeCard from "./ResumeCard";
import VacancyCard from "./VacancyCard";
import useNoScroll from "./useNoScroll";
import './../css/Preview.css';

const PreviewDoc = ( {
    post,
    edit,
    previewContentRef,
    documentData,
    editable,
    requirements="",
    preview,
    onClose,
    currentUser,
    host,
    parentComponent,
    type,
    // vacancy,
    // candidate,
    // indexDoc,
    // setShowDoc,
    // backward,
    // setShowConfirmModal,
    // setShowDocList,
    // setShowProfileBook
} ) => {
    const isVacancy = type === "vacancy";
    // const documentData = targetDoc || vacancy || candidate;
    const docType = isVacancy ? "вакансії" : "резюме";

    useNoScroll(() => parentComponent === "shortCard");

     const closeWindow = () => onClose && onClose();
     
   
    return (
        <>
            <div className={editable?"previewModal":"viewModal"} >
                <div className="previewContainer">
                
                    <h3 className="previewH3">
                        {editable? "Прев'ю ": "Перегляд "}{docType}
                    </h3>

                    {editable&& (
                        <div className="previewHeader"> 
                            <button 
                                className="btnEdit" 
                                onClick={edit}
                                autoFocus={true}
                            >
                                Редагувати
                            </button>
                            <button 
                                className="btnPublish"
                                onClick={post}
                            >
                                Опублікувати
                            </button>
                        </div>
                    )}
                    <div className="previewContent" ref={previewContentRef}>
                        {isVacancy
                            ? 
                            <VacancyCard	 
                                vacancy={documentData}
                                onClose={closeWindow}
                                editable={editable}
                                currentUser={currentUser}
                                preview={preview} 
                                parentComponent={parentComponent}
                                host={host}
                                requirements={requirements}
                                // type={type}
                            />
                            :   
                            <ResumeCard
                                candidate={documentData}
                                onClose={closeWindow}
                                editable={editable}
                                preview={preview}
                                parentComponent={parentComponent}
                                currentUser={currentUser}
                                host={host}
                                // type={type}
                            />
                        }
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default PreviewDoc