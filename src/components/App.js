import React, { useEffect, useState, useRef} from "react";
import axios from 'axios';
import { IoArrowUp, IoSearch } from "react-icons/io5";
import './../css/index.css';
import Header from "./Header";
import Image from "./image";
import wallpaper from "./../img/wallpaper.jpg";
import ResponseList from "./ResponseList";
import Vacancies from "./Vacancies";
import Candidates from "./Candidates";
import WeatherBlock from "./weatherBlock";
import ModalEntry from "./ModalEntry";
import Goodbye from "./Goodbye";
import ModalEditProfile from "./ModalEditProfile";
import BtnAddDoc from "./BtnAddDoc";
import ModalAddDoc from "./ModalAddDoc";
import IconEntry from "./IconEntry";
import classNames from 'classnames';
import './../css/App.css';

const svgHttp = "http://www.w3.org/2000/svg",
      svgXlink = "http://www.w3.org/1999/xlink",
      host = "http://localhost:1337";

const transLetters = {'q':'й', 'w':'ц', 'e':'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ї', 
                       'a': 'ф', 's': 'і', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д', ';': 'ж', "''": 'є',
                       'z': 'я', 'x': 'ч', 'c':'с', 'v':'м', 'b': 'и', 'n':'т', 'm':'ь', ',':'б', '.': 'ю', '""': 'є', '<':'б', '>':'ю'  
}

  
const App = () => {
  const [regUser, setRegUser] = useState({
         userName: null,
         userEmail: "",
         userPassword: "",
         userJWT: null,
         userDocumentId: null,
         userConfirmed: null
  });
  const [typeOfSearch, setTypeOfsearch] = useState(true),
        [regEntry, setRegEntry] = useState(false), //Состояние входа в учетную запись
        [confirm, setConfirm] = useState(false), //Состояние получения регистрации
        [showProfile, setShowProfile] = useState(false), //Состояние просмотра профиля
        [goodbye, setGoodbye] = useState(null),
        [docId, setDocId] = useState(null),
        [userImage, setUserImage] = useState([]),
        [userNameLogo, setUserNameLogo] = useState(null),
        [addDoc, setAddDoc] = useState(false),
        [vacancyName, setVacancyName] = useState([]),
        [citiesBase, setCitiesBase] = useState(null),
        [specialtiesBase, setSpecialtiesBase] = useState(null),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
        [fix, setFix] = useState(''),
        modalClass = classNames({"blurRect": true, }),
        mainSearchRef = useRef(null);
        const [inputErrors, setInputErrors] = useState({
            firstName: '',
            lastName: '',
            userName: '',
        });    

  const [btnScrollUp, setBtnScrollUp] = useState(false);

  const turnExit = () => {
    if(!confirm) {
      toggleButton();     
    } else {setConfirm(!confirm);
      setUserNameLogo("Гість");
      setDocId(null);
      setUserImage([]);
      setGoodbye(true);
    }
    mainSearchRef.current.focus();
   };

   
const validInput = (value, inputElement) => {
  if(inputElement.type === "text") {
      const forbiddenChars = /[<>{}[\]()&$%#?!*^+=|\\:;,"'`~]/;
      const mat = value.match(forbiddenChars);
      
      if (mat) {
          setInputErrors(prev => ({
              ...prev,
              [inputElement.name]: 'Використання таких символів не допускається'
          }));
          inputElement.setCustomValidity('Внесений некоректний символ/ли');
      } else {
          setInputErrors(prev => ({
              ...prev,
              [inputElement.name]: ''
          }));

          inputElement.setCustomValidity('');
      }
  }
};
         
  const toggleModal = () => {if(regEntry)setRegEntry(!regEntry)}  // Выход из учетной записи
  const toggleButton = () => {if(!regEntry)setRegEntry(!regEntry)} // Вход в учетную запись (regEntry меняется на true )

          useEffect(() => {
            if (userNameLogo&&docId) {

              const fetchUserImage = async () => {
            
                try {const response = await axios.get(`${host}/api/Users/?filters[documentId][$eq]=${docId}&populate=userAvatar`);
    
                  setUserImage(response.data);} 
                catch (error) {setError(error);} 
                finally {setLoading(false);}
              };

              fetchUserImage()
            }
            }, [userNameLogo, docId, regEntry]);
       
      confirm&&toggleModal();

      useEffect(() => {
        if(docId&& !specialtiesBase) {
          const fetchSpecialties = async () => {
            
            try {const response = await axios.get(`${host}/api/bases?filters[dbTitle][$eq]=dbSpecialties`);
            
              setSpecialtiesBase(response.data.data[0]?.dataBase.specialties || []);
            }          
            catch (error) {setError(error);} 
            finally {setLoading(false);             
            }
          };

          fetchSpecialties();
          
        }
      }, [docId, specialtiesBase]);

      useEffect(() => {
        if(docId&& !citiesBase) {
          const fetchCities = async () => {
            
            try {const response = await axios.get(`${host}/api/bases?filters[dbTitle][$eq]=dbCities`);
            
              setCitiesBase(response.data.data[0]?.dataBase.cities || []);
            }          
            catch (error) {setError(error);} 
            finally {setLoading(false);             
            }
          };

          fetchCities();
          
        }
      }, [docId, citiesBase]);

  
  window.addEventListener('scroll', () => {
    document.documentElement.scrollTop >= 140 ? setFix('Fix') : setFix('');
    document.documentElement.scrollTop > document.documentElement.clientHeight ? setBtnScrollUp(true) : setBtnScrollUp(false);
  });

  return(
      <div className="container">   
        <div className="wallimage"><Image url={wallpaper} alt="Обои" />
        </div>
          <ModalEntry 
            host={host} 
            regEntry={regEntry} 
            modalClass={modalClass} 
            docId={docId} 
            setDocId={setDocId} 
            toggleModal={toggleModal} 
            confirm={confirm} 
            setConfirm={setConfirm} 
            setUserNameLogo={setUserNameLogo} 
            regUser={regUser} 
            setRegUser={setRegUser}
            validInput={validInput}
            inputErrors={inputErrors}
          />

          {goodbye&&<Goodbye 
            isOpen={goodbye} 
            onClose={setGoodbye}
          />}
            
          <Header 
            host={host} 
            typeOfSearch = {typeOfSearch} 
            setTypeOfsearch = {setTypeOfsearch}  
            confirm={confirm} 
            svgHttp={svgHttp} 
            svgXlink={svgXlink} 
            userNameLogo={userNameLogo}  
            userImage={userImage} 
            regEntry={regEntry}
            mainSearchRef={mainSearchRef}
            turnExit={turnExit}
            setShowProfile={setShowProfile}
          /> 
          {showProfile&&
            <ModalEditProfile 
              modalClass={modalClass}
              setShowProfile={setShowProfile}
              svgHttp={svgHttp}
              svgXlink={svgXlink}
              userImage={userImage}
              host={host}
            />
          }

          <div className="searchBlock">
            <div className={`search ${fix}`}>
                <form id="searchForm">
                <input ref={mainSearchRef} type="search"  placeholder={typeOfSearch?"Пошук кандидата" : "Пошук вакансії"} name="search"/>
                <button type="submit" className="btnSearch" onClick={(e) =>{
                        e.preventDefault();
                        }}> 
                        <IoSearch />
                </button>
                </form>                
                {confirm&&<div className="btnWrap">
                    <BtnAddDoc 
                      type={typeOfSearch} 
                      setAddDoc={setAddDoc}
                    />
                  </div> 
                }
                 {fix&&<IconEntry 
                    confirm={ confirm } 
                    svgHttp={ svgHttp } 
                    svgXlink={ svgXlink } 
                    turnExit={ turnExit } 
                  />}
            </div> 
          </div>      
          <ResponseList typeOfSearch = {typeOfSearch} />
            {addDoc&&<ModalAddDoc 
              vacArr={vacancyName} 
              type={typeOfSearch} 
              addDoc={addDoc} 
              setAddDoc={setAddDoc} 
              modalClass={modalClass} 
              host={host}
              validInput={validInput}
              inputErrors={inputErrors}
              citiesBase={citiesBase}
              specialtiesBase={specialtiesBase}
              />
            }
          <div className="mainContainer">
            <main>                         
              {typeOfSearch&&<Candidates 
                typeOfSearch={typeOfSearch} 
                host={host}/>}
              {!typeOfSearch&&<Vacancies 
                host={host} 
                setTitle={setVacancyName} />} 
                   
            </main>

            <aside>
              <WeatherBlock/>
            </aside>
            {btnScrollUp&&<button className="btnUp" 
              onClick={() => window.scrollTo(0, 0)}>
              <IoArrowUp className="arrowUp" />
            </button>}
          </div>
        </div>
  )
    }

    export default App