import { useState, useEffect }  from "react";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import PageFour from "./PageFour";
import PreviewDoc from './PreviewDoc';
import SvgBook from "./SvgBook";
import SinglePageBook from "./SinglePageBook";
import EvenBookPage from "./EvenBookPage";
import OddBookPage from "./OddBookPage ";

const Profile = ( { 
  setShowProfile,
  host,
  currentUser,
  setCurrentUser,
  getDataItems,
  axios,
  type 
} ) => {

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

    const docs = type ? "Vacancies" : "Candidates";

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
    type ? fetchDeleteDoc() : fetchDeleteImgAndDoc();
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
          <SinglePageBook
            svgStyle={svgStyle}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            host={host} 
            getDataItems={getDataItems}
            axios={axios}
            setShowProfile={setShowProfile}
            type={type}
            flipPage={flipPage}
            currentDoc={currentDoc}
            showDocList={showDocList}
            setShowProfileBook={setShowProfileBook}
            backward={backward}
            showConfirmModal={showConfirmModal}
            indexDoc={indexDoc}
            deleteDocument={deleteDocument}
            setShowDoc={setShowDoc}
            typeBtn={typeBtn}
            openModal={openModal}
          />
        )      
        }
        {showProfileBook && (
        <div className="profileBook">
            <SvgBook 
              svgStyle={svgStyle}
            />
            {/*  Содержимое Страницы 1 */}
            <PageOne
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                host={host} 
                getDataItems={getDataItems}
                axios={axios}
                setShowProfile={setShowProfile}
            />
            {/* Содержимое Страницы 2 */}
             <PageTwo
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                host={host} 
                getDataItems={getDataItems}
                axios={axios}
                setShowProfile={setShowProfile}
                type={type}                
                flipPage={flipPage}
            />
            {/* Лист 2 Лицо */}
            <EvenBookPage
              svgStyle={svgStyle}
            />
            {/* Содержимое Страницаы 3 */}
            <PageThree
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                host={host} 
                getDataItems={getDataItems}
                axios={axios}
                setShowProfile={setShowProfile}
                type={type}                
                flipPage={flipPage}
            />
            {/* Лист 2 Оборот */}
            <OddBookPage
              svgStyle={svgStyle}
            />

          {/* Содержимое Страницы 4 */}
            <PageFour
                currentDoc={currentDoc}
                currentUser={currentUser}
                showDocList={showDocList}
                setShowProfileBook={setShowProfileBook}
                backward={backward}
                type={type}
                setShowProfile={setShowProfile}
                showConfirmModal={showConfirmModal}
                indexDoc={indexDoc}
                deleteDocument={deleteDocument}
                setShowDoc={setShowDoc}
                typeBtn={typeBtn}
                openModal={openModal}
            />
        </div>        
        )}
        {showDoc&& 
           <PreviewDoc
              documentData={currentUser.userDocs[indexDoc]}
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
              type={type ? "vacancy" : "resume"}
            />
        }
      </>
    )
}
export default Profile