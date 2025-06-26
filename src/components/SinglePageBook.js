import SvgSPB from "./SvgSPB";
import './../css/SinglePageBook.css';

const SinglePageBook = ( {
    svgStyle,
    currentPage,
    nextPage,
    isFlipping,
 } ) => {

    return (
      <div className="singlePage">
        <SvgSPB
          svgStyle={svgStyle}
          topPage={currentPage}
          bottomPage={nextPage}
          isFlipping={isFlipping}
        />


      </div>
    )
}
export default SinglePageBook;