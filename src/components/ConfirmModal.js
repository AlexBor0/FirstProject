
const ConfirmModal = ( {
  currentUser,
  indexDoc,
  deleteDocument,
  setShowDoc,
  typeBtn,
  backward,
  setShowProfileBook,
  document
} ) => {

    const action = (typeBtn === "del"? "видалити" : (typeBtn === "edit" ? "редагувати" : "переглянути"));

    const editDocument = () => console.log('Редактирование документа');

    const viewDocument = () => {
        setShowDoc(true);
    };

    const chooseAction = (typeBtn) => {
        switch (typeBtn) {
            case "del": return deleteDocument();
            case "edit": return editDocument();
            case "view": return viewDocument();
            default: console.log("Непередбачена помилка")
        }
    };
    const confirmAction = (e) => {
        e.preventDefault();
        chooseAction(typeBtn);
        if(typeBtn === "view") {
        setShowProfileBook(false);
      }
    };

    return (
        <div className="modalConfirm">
        <p>Бажаєте {action} {document} <b>{currentUser.userDocs[indexDoc].title}</b> ? </p>
        <div className="wrapBtns">
          <button onClick={backward}>
              НІ
          </button>
          <button autoFocus={true} onClick={
            // () => chooseAction(typeBtn)
            confirmAction
            }
          >
              ТАК
          </button>
        </div>
      </div>
    )
}

export default ConfirmModal;