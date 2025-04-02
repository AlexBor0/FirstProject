import React, { useState }  from "react";
import ProfileForm from "./ProfileForm";
import { IoCloseCircleSharp, IoArrowRedo, IoCreate,  IoEyeSharp, IoClose } from "react-icons/io5";
import FormatDate from './FormatDate';
import ConfirmModal from './ConfirmModal';


const Profile = ({ svgHttp, svgXlink, setShowProfile, host, currentUser, setCurrentUser, getDataItems, axios, typeOfSearch }) => {

  const currentDoc = currentUser?.userDocs || [];
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDocList, setShowDocList] = useState(true);
  const [indexDoc, setIndexDoc] = useState(null);
  const [typeBtn, setTypeBtn] = useState(null);

  const openModal = (e, index) => {
    e.preventDefault();
    setIndexDoc(index);
    setTypeBtn(e.currentTarget.dataset.type);
    setShowConfirmModal(true);
    setShowDocList(false); 
  }

    return(
      <div className="profileBook">
        <svg
          xmlns= {svgHttp}
          xmlSpace="preserve"
          width="470px"
          height="372px"
          version="1.1"
          style={{
            shapeRendering: "geometricPrecision",
            textRendering: "geometricPrecision",
            imageRendering: "optimizeQuality",
            fillRule: "evenodd",
            clipRule: "evenodd"
          }}
          viewBox="55 245 500 230"
          xmlnsXlink={svgXlink}
        >
          <defs>
            <style type="text/css">
              {`
                .str5 {stroke:#B87333;stroke-miterlimit:22.9256}
                .str3 {stroke:#035774;stroke-width:2;stroke-miterlimit:22.9256}
                .str0 {stroke:#035774;stroke-width:9;stroke-miterlimit:22.9256}
                .str4 {stroke:#B87333;stroke-width:2;stroke-miterlimit:22.9256}
                .str2 {stroke:black;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:22.9256}
                .str1 {stroke:#035774;stroke-width:9;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:22.9256}
                .fil3 {fill:#E31E24}
                .fil0 {fill:#177F8A}
                .fil1 {fill:#C4E0D6}
                .fil2 {fill:#FCFCE6}
                .fil4 {fill:#104B5D;fill-rule:nonzero}
                .fil6 {fill:#177F8A;fill-rule:nonzero}
                .fil5 {fill:#9CC7D0;fill-rule:nonzero}
                .fil8 {fill:#A73333;fill-rule:nonzero}
                .fil7 {fill:white;fill-rule:nonzero}
              `}
            </style>
          </defs>
          <g id="Слой_x0020_1">
            <rect className="fil0 str0" x="76" y="208" width="461" height="332" rx="13" ry="13"/>
            <g>
              <path className="fil1 str1" d="M294 533c-3,-21 -25,-22 -41,-22l-128 0c-30,0 -25,4 -25,-39 0,-19 1,-256 0,-268 0,-20 0,-25 16,-25 48,0 97,0 145,0 25,0 29,8 41,20l0 334 -9 0z"/>
              <path className="fil1 str1" d="M318 533c3,-21 25,-22 41,-22l128 0c30,0 25,4 25,-39 0,-19 -1,-256 0,-268 0,-20 0,-25 -16,-25 -48,0 -97,0 -145,0 -25,0 -29,8 -41,20l0 334 9 0z"/>
            </g>
            <rect className="fil2" x="330" y="204" width="164" height="290" rx="19" ry="19"/>
            {/* <path className="fil3 str2" d="M338 222c7,-4 10,-7 15,-10 4,3 9,6 15,10 4,3 6,0 5,-2l0 -45 -40 0 0 45c0,2 2,5 5,2l0 0z"/> */}

            <rect className="fil2" x="118" y="204" width="164" height="290" rx="19" ry="19"/>

          </g>
        </svg>
                 
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
          <div className="pageTwo">
            <button className="pageBtn" onClick = {(e) => { e.preventDefault(); setShowProfile(false) }}>
              <IoCloseCircleSharp className="delete-icon" />
            </button>
            <div className="profileHead" >
              { typeOfSearch? "МОЇ ВАКАНСІЇ": "МОЇ РЕЗЮМЕ"}
            </div>
            <div  className="currentEntries">
              {showConfirmModal&&<ConfirmModal
                setShowConfirmModal={setShowConfirmModal}
                indexDoc={indexDoc}
                currentUser={currentUser}
                setShowDocList={setShowDocList}
                host={host}
                axios={axios}
                setCurrentUser={setCurrentUser}
                typeBtn={typeBtn}
              />}
              {showDocList&& (<ol >
                {currentDoc.map((el,index) => (
                  <li key={index}>
                    <h4>{el.title}</h4>
                    <p><data>Створено: <FormatDate isoDate={el.createdAt} /></data></p>
                    <p><span>Оглянуто: (0)</span></p>
                    <p><span>Відгуки: (0)</span>
                    <button className="pageBtn item" data-type="del" onClick = {(e) => openModal(e,index)}>
                      <IoClose className="del-icon" />
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
            <button className="pageBtn" onClick={e => e.preventDefault}>
            <IoArrowRedo className="redo-icon"/> 
            </button>
              
          </div>
      </div>
    )
}
export default Profile