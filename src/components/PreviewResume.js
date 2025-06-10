
import './../css/Preview.css';
import ResumeCard from "./ResumeCard";
import useNoScroll from "./useNoScroll";

const PreviewResume = ( {
    post,
    edit,
    previewContentRef,
    candidate,
    editable,
    preview,
    onClose,
    currentUser,
    host,
    parentComponent
} ) => {

    useNoScroll(() => {
            if (parentComponent === "shortCard") {
                return true;
            }
        });    
   
    return (
        <>
            <div className={editable?"previewModal":"viewModal"} >
                <div className="previewContainer">
                
                    <h3 className="previewH3">{editable? "Прев'ю ": "Перегляд "}резюме</h3>
                    {editable&& (
                        <div className="previewHeader"> 
                            <button className="btnEdit" 
                                onClick={() => {
                                    edit();

                                }}
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

                        <ResumeCard
                            candidate={candidate}
                            onClose={onClose}
                            editable={editable}
                            preview={preview}
                            parentComponent={parentComponent}
                            currentUser={currentUser}
                            host={host}
                        />
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default PreviewResume