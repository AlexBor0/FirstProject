import SvgSPB from "./SvgSPB";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import PageFour from "./PageFour";
import './../css/SinglePageBook.css';

const SinglePageBook = ( {
    svgStyle,
    currentUser,
    setCurrentUser,
    host,
    getDataItems,
    axios,
    setShowProfile,
    type,
    flipPage,
    currentDoc, 
    showDocList,
    setShowProfileBook,
    backward,
    showConfirmModal,
    indexDoc,
    deleteDocument,
    setShowDoc,
    typeBtn,
    openModal
 } ) => {

    return (
      <div className="singlePage">
        <SvgSPB
          svgStyle={svgStyle}
        />
        <PageOne
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            host={host} 
            getDataItems={getDataItems}
            axios={axios}
            setShowProfile={setShowProfile}
        />
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
    )
}
export default SinglePageBook;