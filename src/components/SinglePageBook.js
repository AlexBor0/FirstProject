import PageOne from "./PageOne";
import './../css/SinglePageBook.css';

const SinglePageBook = ( {
    svgStyle,
    currentUser,
    setCurrentUser,
    host,
    getDataItems,
    axios
 } ) => {

    return (
        <div className="singlePage">
            <svg
                viewBox="49 50 146 238.89
                "
                className="singlePageOne"
                width="260px"
                height="372px"
                xmlSpace="preserve" 
                version="1.1"
                style={{svgStyle}}
                xmlns= "http://www.w3.org/2000/svg"            
                xmlnsXlink="http://www.w3.org/1999/xlink"     
            >
                <defs>
                  <style type="text/css">
                    {`
                      .strSP0 {stroke:#035774;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:22.9256}
                      .strSP1 {stroke:#035774;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:22.9256}
                      .filSP3 {fill:#E31E24}
                      .filSP0 {fill:#177F8A}
                      .filSP1 {fill:#C4E0D6}
                      .filSP2 {fill:#FCFCE6}
                    `}
                  </style>
                </defs>
                <g >
                    <path class="filSP0 strSP0" d="M50 78l144 0c2,0 4,3 4,7l0 182c0,4 -2,7 -4,7l-144 0c-2,0 -4,-3 -4,-7l0 -182c0,-4 2,-7 4,-7z"/>
                    <path class="filSP1 strSP1" d="M167 256c17,0 15,2 15,-23 0,-11 0,-152 0,-159 0,-12 0,-15 -10,-15 -33,0 -67,0 -100,0 -10,0 -10,3 -10,15 0,7 0,147 0,159 0,26 -3,23 15,23 30,0 60,0 90,0z"/>
                    <path class="filSP2" d="M84 75c25,0 50,0 75,0l0 0c6,0 12,5 12,12l0 149c0,6 -5,12 -12,12l-75 0c-6,0 -12,-5 -12,-12l0 -149c0,-6 5,-12 12,-12l0 0z"/>
                </g>

            </svg>
            <PageOne
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                host={host} 
                getDataItems={getDataItems}
                axios={axios}
            />
          </div>
    )
}
export default SinglePageBook;