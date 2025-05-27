import { useState, useEffect }  from "react";
import ProfileForm from "./ProfileForm";
import { IoCloseCircleSharp, IoArrowRedo, IoCreate,  IoEyeSharp, IoTrash, IoArrowUndo } from "react-icons/io5";
import FormatDate from './FormatDate';
import PreviewResume from './PreviewResume';
import PreviewVacancy from './PreviewVacancy';
import SvgBook from "./SvgBook";
import EvenBookPage from "./EvenBookPage";
import OddBookPage from "./OddBookPage ";
import ConfirmModal from "./ConfirmModal";
import CompanyPage from "./CompanyPage";
import BillBoard from "./BillBoard";
import DetailsPage from "./DetailsPage";
import ResponsesPage from "./ResponsesPage";

const Profile = ({ 
  svgHttp,
  svgXlink,
  setShowProfile,
  host,
  currentUser,
  setCurrentUser,
  getDataItems,
  axios,
  typeOfSearch }) => {

  const currentDoc = currentUser?.userDocs || [];
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDocList, setShowDocList] = useState(true);
  const [indexDoc, setIndexDoc] = useState(null);
  const [typeBtn, setTypeBtn] = useState(null);
  const [showDoc, setShowDoc] = useState(false);
  const [showProfileBook, setShowProfileBook] = useState(true);
  const [isPageTwoVisible, setIsPageTwoVisible] = useState(true);
  const delSuccessStatuses = [200, 202, 204];
  const svgStyle = {
    shapeRendering: "geometricPrecision",
    textRendering: "geometricPrecision",
    imageRendering: "optimizeQuality",
    fillRule: "evenodd",
    clipRule: "evenodd"
  }

    const docs = typeOfSearch ? "Vacancies" : "Candidates";

    useEffect(() => { // Установка начального состояния видимости страниц
    if (showProfileBook) {
      const pageTwo = document.querySelector('.pageTwo');
      const pageThree = document.querySelector('.pageThree');
      const bookPageTwo = document.querySelector('.bookPageTwo');
      const bookPageThree = document.querySelector('.bookPageThree');
      if (pageTwo && pageThree && bookPageTwo && bookPageThree) {
        if (isPageTwoVisible) {
          pageTwo.style.display = 'block';
          bookPageThree.style.display = 'block';
          pageThree.style.display = 'none';
          bookPageTwo.style.display = 'none';
        } else {
          pageTwo.style.display = 'none';
          bookPageThree.style.display = 'none';
          pageThree.style.display = 'block';
          bookPageTwo.style.display = 'block';
        }
      }
    }
  }, [showProfileBook, isPageTwoVisible]);
    
    const fetchDeleteDoc = async () => {

      const idDocToDel = currentUser.userDocs[indexDoc].documentId || null;

      if (idDocToDel) {
          const deleteDoc = await axios.delete(
              `${host}/api/${docs}/${idDocToDel}`,
                  {
                      headers: {
                          Authorization: `Bearer ${currentUser.userJWT}`,
                      },
                  }  
          );
  
          if (!delSuccessStatuses.includes(deleteDoc.status)) {
              throw new Error("Помилка при видаленні резюме");
          } 
          else {
              setCurrentUser(prev => ({
                  ...prev, 
                  userDocs: prev.userDocs.filter((_, idx) => idx !== indexDoc)
              }));
          };
      } else {
          console.log("Не знайдено документу для видалення")
      };
      
    };

    const fetchDeleteImgAndDoc = async () => {
      const idFotoToDel = currentUser.userDocs[indexDoc].foto.id || null; 

      if (idFotoToDel)  {
           const deleteImgDoc = await axios.delete(
               `${host}/api/upload/files/${idFotoToDel}`,
                   {
                       headers: {
                       Authorization: `Bearer ${currentUser.userJWT}`,
                       },
                   }  
           );

           if (!delSuccessStatuses.includes(deleteImgDoc.status)) {
           throw new Error("Помилка при видаленні фото");
           } else {
               fetchDeleteDoc();
             }
       } else {
           fetchDeleteDoc();
       };

    };

  const backward = (e) => {
      e.preventDefault(); 
      setShowConfirmModal(false);
      setShowDocList(true);
  };

  const deleteDocument = () => {
    typeOfSearch ? fetchDeleteDoc() : fetchDeleteImgAndDoc();
    setShowConfirmModal(false);
    setShowDocList(true);
  };

  const openModal = (e, index) => {
    e.preventDefault();
    setIndexDoc(index);
    setTypeBtn(e.currentTarget.dataset.type);
    setShowConfirmModal(true);
    setShowDocList(false); 
  };

  const clearAnimationClasses = (elements) => {
    elements.forEach(element => {
      element.classList.remove('flip-out', 'flip-in', 'flip-out-reverse', 'flip-in-reverse');
    });
  };
  const flipPage = (e) => {
    e.preventDefault();

    const pageTwo = document.querySelector('.pageTwo');
    const pageThree = document.querySelector('.pageThree');
    const bookPageThree = document.querySelector('.bookPageThree');
    const bookPageTwo = document.querySelector('.bookPageTwo');
    const allElements = [pageTwo, pageThree, bookPageTwo, bookPageThree];
    clearAnimationClasses(allElements);

    if (isPageTwoVisible) {
      // вперед
      pageTwo.classList.add('flip-out');
      bookPageThree.classList.add('flip-out');
      setTimeout(() => {
        pageTwo.style.display = 'none';
        bookPageThree.style.display = 'none';
        pageThree.style.display = 'block';
        bookPageTwo.style.display = 'block';
        pageThree.classList.add('flip-in');
        bookPageTwo.classList.add('flip-in');
        setIsPageTwoVisible(false);
        setTimeout(() => clearAnimationClasses(allElements), 210);
      },
       210);
    } else {
      // назад
      pageThree.classList.add('flip-in-reverse');
      bookPageTwo.classList.add('flip-in-reverse');
      setTimeout(() => {
        pageThree.style.display = 'none';
        bookPageTwo.style.display = 'none';
        pageTwo.style.display = 'block';
        bookPageThree.style.display = 'block';
        pageTwo.classList.add('flip-out-reverse');
        bookPageThree.classList.add('flip-out-reverse');
        setIsPageTwoVisible(true);
        setTimeout(() => clearAnimationClasses(allElements), 210);
      }, 210);
    }
};

const onClose = () => {
        setShowDoc(false); 
        setShowConfirmModal(false);
        setShowDocList(true);
        setShowProfileBook(true);
    };

    return(
      <>
        {showProfileBook && (
        <div className="profileBook">
          <SvgBook 
            svgHttp={svgHttp}
            svgXlink={svgXlink}
            svgStyle={svgStyle}
          />

            {/*  Содержимое Страницы 1 */}

            <div className="pageOne">
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

            {/* Содержимое Страницы 2 */}

            <div className="pageTwo">
              <button className="pageBtn" autoFocus={true} onClick = {(e) => { e.preventDefault(); setShowProfile(false) }}>
                <IoCloseCircleSharp className="delete-icon" />
              </button>
              <div className="profileHead" >
                { typeOfSearch? "КОМПАНІЯ": "РОБОТА"}
              </div>
              <div  className="currentEntries">
              { typeOfSearch
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

            {/* Страница 2 */}
            <EvenBookPage
              svgHttp={svgHttp}
              svgXlink={svgXlink}
              svgStyle={svgStyle}
            />

           {/* Содержимое Страницаы 3 */}
           <div className="pageThree">
              <div className="profileHead" >
              { typeOfSearch? "РЕКВІЗИТИ": "МОЇ ВІДГУКИ" }
              </div>
              <div className="currentEntries">
                { typeOfSearch
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

            {/* Страница 3 */}
          <OddBookPage
            svgHttp={svgHttp}
            svgXlink={svgXlink}
            svgStyle={svgStyle}
          />

          {/* Содержимое Страницы 4 */}
          <div className="pageFour">
              <button className="pageBtn" autoFocus={true} onClick = {(e) => { e.preventDefault(); setShowProfile(false) }}>
                <IoCloseCircleSharp className="delete-icon" />
              </button>
              <div className="profileHead" >
                { typeOfSearch? "МОЇ ВАКАНСІЇ": "МОЇ РЕЗЮМЕ"}
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
                    document={typeOfSearch ? "вакансію" : "резюме"}
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
              {/* <button className="pageBtn" onClick={flipPage}>
                <IoArrowRedo className="redo-icon"/> 
              </button> */}
                
            </div>
          

        </div>
        
        )}
        {showDoc&& (typeOfSearch 
          ? <PreviewVacancy
              vacancy={currentUser.userDocs[indexDoc]}
              indexDoc={indexDoc}
              setShowDoc={setShowDoc}
              editable={false}
              preview={true}
              host={host}
              backward={backward}
              setShowConfirmModal={setShowConfirmModal}
              setShowDocList={setShowDocList}
              setShowProfileBook={setShowProfileBook}
              currentUser={currentUser}
              onClose={onClose}
            />
          : <PreviewResume
              candidate={currentUser.userDocs[indexDoc]}
              indexDoc={indexDoc}
              setShowDoc={setShowDoc}
              editable={false}
              host={host}
              backward={backward}
              setShowConfirmModal={setShowConfirmModal}
              setShowDocList={setShowDocList}
              setShowProfileBook={setShowProfileBook}
            /> )
        }


      </>
    )
}
export default Profile