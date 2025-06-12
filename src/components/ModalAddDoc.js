import { useState, useRef } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import AddResumeForm from "./AddResumeForm";
import AddVacancyForm from "./AddVacancyForm";
import MessagePost from "./MessagePost";
import Preview from "./Preview";
import useEsc from "./useEsc";
import useNoScroll from "./useNoScroll";
import './../css/ModalAddDoc.css';

const ModalAddDoc = ( {
    addDoc,
    setAddDoc,
    modalClass,
    host,
    type,
    vacArr,
    inputErrors,
    citiesBase,
    specialtiesBase,
    getDataItems,
    currentUser,
    setCurrentUser,
    axios,
} ) => {

    const [newCandidate, setNewCandidate] = useState({
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        vacancy: "",
        title: "",
        city: "",
        region: "",
        resume: "",
        documentId: "",
        foto: null, 
      }),

        [newVacancy, setNewVacancy] = useState({
        company: "",
        vacancy: "",
        candidate: "",
        department: "",
        employment: "",
        workSchedule: "",
        workFormat: "",        
        city: "",
        region: "",
        salary: "",
        experience: "",
        description: "",
        requirements: [],
        documentId: "",
      }),

    [savingEditorContent, setSavingEditorContent] = useState(null),
    [postFetch, setPostFetch] = useState(false),
    [postSuccess, setPostSuccess] = useState(null),
    [selectedIndex, setSelectedIndex] = useState(0),
    [saveTextEditor, setSaveTextEditor] = useState(false),
    [loading, setLoading] = useState(false),
    [classModal, setClassModal] = useState("modalAddDoc"),
    [isPreviewVisible, setIsPreviewVisible] = useState(false),
    [error, setError] = useState(null);

    const modalContRef = useRef(null);
    const editable = true;
    

    const arrowPress = (e, options) => {
        const { 
            list, 
            setValue, 
            updateItem 
          } = options;
    
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const direction = e.key === 'ArrowDown' ? 1 : -1;
            
               setSelectedIndex((prev) => (prev + direction + list.length) % list.length);
            }
            else if (e.key === 'Enter'&&list.length > 0 ) {
                e.preventDefault();
                const selectedItem = list[selectedIndex];
                if (selectedItem) {
                    if (typeof selectedItem === 'string') {
                      setValue(selectedItem);
                      updateItem('vacancy', selectedItem);
                    } 
                    else {
                        setValue(selectedItem.cN);
                        updateItem('city', selectedItem.cN);
                        updateItem('region', selectedItem.re);
                      }
                      setSelectedIndex(0);
                      options.hideList();
                    }
            }
            else if (e.key === 'Enter'&&list.length > 0){
                setSelectedIndex(0);
        }        
    };

    const resetInput = (e, options) => {
        e.preventDefault();
        const {
            setSelectValue,
            resetFields,
            setNewItem,
            hideList
        } = options;
        setSelectValue("");
        setNewItem(prev => {
            const updated = { ...prev };
            resetFields.forEach(field => (updated[field] = ""));
            return updated;
        });
        setSelectedIndex(0);
        hideList(false);
    };

    useEsc(()=> setAddDoc(false));
    useNoScroll( addDoc, saveTextEditor );
  

    return ((
        <div className={modalClass} 
             style={{ overflow: "hidden"}}>

            {!isPreviewVisible && (
            <div className={classModal}>

                <div className="modalAdCont" ref={modalContRef}>
                    <IoCloseCircleSharp className="delete-icon" onClick = {() => setAddDoc(false)}/>
                    {!postFetch && !type && (
                        < AddResumeForm 
                            vacArr={vacArr}
                            setNewCandidate={setNewCandidate} 
                            newCandidate={newCandidate} 
                            inputErrors={inputErrors}
                            citiesBase={citiesBase}
                            arrowPress={arrowPress}
                            selectedIndex={selectedIndex}
                            setSelectedIndex={setSelectedIndex}
                            getDataItems={getDataItems}
                            resetInput={resetInput}
                            setPreview={setSaveTextEditor}
                            specialtiesBase={specialtiesBase}
                            setClassModal={setClassModal}
                            setIsPreviewVisible={setIsPreviewVisible}
                        />
                    )}
                    {!postFetch && type && (
                        < AddVacancyForm 
                            citiesBase={citiesBase}
                            arrowPress={arrowPress}
                            selectedIndex={selectedIndex}
                            setSelectedIndex={setSelectedIndex}
                            resetInput={resetInput}
                            newVacancy={newVacancy}
                            setNewVacancy={setNewVacancy}
                            getDataItems={getDataItems}
                            specialtiesBase={specialtiesBase}
                            saveTextEditor={saveTextEditor}
                            setSaveTextEditor={setSaveTextEditor}
                            modalContRef={modalContRef}
                            setIsPreviewVisible={setIsPreviewVisible}
                            setSavingEditorContent={setSavingEditorContent}
                            savingEditorContent={savingEditorContent}
                            currentUser={currentUser}
                        />
                    )}
                    
                    <p>{error && `Резюме не відправлене, виникла помилка: ${error.MessagePost}! Спробуйте відправити повторно`}</p>
                    <p>{postFetch && loading && "Зачекайте..."}</p>
                </div>
            </div>
            )}
            {isPreviewVisible && saveTextEditor && (
                <Preview
                    type={type}
                    newVacancy={newVacancy}
                    setNewVacancy={setNewVacancy}
                    newCandidate={newCandidate}
                    setNewCandidate={setNewCandidate}
                    setSaveTextEditor={setSaveTextEditor}
                    setPostFetch={setPostFetch}
                    setPostSuccess={setPostSuccess}
                    setLoading={setLoading}
                    setError={setError}
                    host={host}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    axios={axios}
                    setIsPreviewVisible={setIsPreviewVisible}
                    setAddDoc={setAddDoc}
                    editable={editable}
                />
            )}
            {postSuccess && (
                        <MessagePost 
                            isOpen={postSuccess} 
                            onClose={setPostSuccess} 
                            closeItem={setAddDoc}
                            typeOfDoc={type}
                            newClass={"modalAddDoc modalAdComp"}
                            editable={editable}
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            setLoading={setLoading}
                            axios={axios}
                            host={host}
                        />
            )}
        </div>)
    );
}
export default ModalAddDoc;