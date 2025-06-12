import { useEffect, useState, useRef, useCallback } from "react";
import { IoArrowUp } from "react-icons/io5";
import axios from 'axios';
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
import BtnBurgerMenu from "./BtnBurgerMenu";
import Navigation from "./Navigation";
import SearchForm from "./SearchForm";
import validInput from "./validInput";
import './../css/index.css';
import './../css/App.css';


const host = "http://localhost:1337";

 
const App = () => {
  const [regUser, setRegUser] = useState({
         userName: null,
         userEmail: null,
         userPassword: null,
         userStatus: null,
         userConfirmed: null,
         userJWT: null,
         userId: null
        });
  const [currentUser, setCurrentUser] = useState({
        userLogin: null,
        userEmail: null,
        userName: null,
        userStatus: null,
        userImage: [],
        userDocs: [],
        changeFoto: false,
        addDoc: null,
        userJWT: null,
        docId: null,
        id: null,
        company: null
        });
  const [typeOfSearch, setTypeOfsearch] = useState(true),
        [regEntry, setRegEntry] = useState(false), //Состояние входа в учетную запись
        [confirm, setConfirm] = useState(false), //Состояние получения регистрации
        [showProfile, setShowProfile] = useState(false), //Состояние просмотра профиля
        [goodbye, setGoodbye] = useState(null),
        [addDoc, setAddDoc] = useState(false),
        [vacancyName, setVacancyName] = useState([]),
        [citiesBase, setCitiesBase] = useState(null),
        [specialtiesBase, setSpecialtiesBase] = useState(null),
        [isClicked, setIsClicked] = useState(false),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null),
        [fix, setFix] = useState(''),
        [inputErrors, setInputErrors] = useState({
            firstName: '',
            lastName: '',
            userName: '',
        }),
        modalClass = classNames({"blurRect": true, });

 const mainSearchRef = useRef(null), 
       userLogoRef = useRef(null);   

  const [btnScrollUp, setBtnScrollUp] = useState(false);

  const resetCurrentUser = () => ({
    userLogin: null,
    userEmail: null,
    userName: null,
    userStatus: null,
    userImage: [],
    userDocs: [],
    changeFoto: false,
    addDoc: null,
    userJWT: null,
    docId: null,
    id: null,
    company: null
  });
  const turnExit = () => {
    if(!confirm) {
      toggleButton();     
    } else {
      setConfirm(false);
      setCurrentUser(resetCurrentUser());  
      localStorage.removeItem('jwt');
      setGoodbye(true);
    }
    mainSearchRef.current?.focus();
  };
  const resetRegUser = () => ({
    userName: null,
    userEmail: null,
    userPassword: null,
    userStatus: null,
    userConfirmed: null
  });
  const resetRegForm = useCallback(() => {
    setRegUser(resetRegUser());
  }, [setRegUser] ); 

  const getDataItems = (e, options = {}) => {
    const { name, value } = e.target;
    const exceptions = options.exceptions || [];

    if (options.setNewDoc) options.setNewDoc(prev => ({ ...prev, [name]: value }));
    if (options.setSelectValue) options.setSelectValue(value);
    if (options.setQuery) options.setQuery(value);
    if (options.setShowList) options.setShowList(value.length > 0);
    if (options.validate) validInput(value, e.target, exceptions, setInputErrors);
};

useEffect (() => {
  const status = currentUser.userStatus;
  if(status) {
    status === "candidate"?setTypeOfsearch(false):setTypeOfsearch(true)
  } 
}, [currentUser.userStatus])

useEffect(() => { // Получение данных пользователя
  const jwt = localStorage.getItem('jwt');
  const status = currentUser.userStatus;
  const recDoc = status === "employer"? "vacancies":"candidates";
  const companyReq = status === "employer"? "&populate[company][populate][logo]=true" : "";
  if (jwt) {
      const fetchUserData = async () => {
          try {
              const response = await axios.get(`${host}/api/users/me?populate[userAvatar]=true&populate[${recDoc}]=true${companyReq}`, {
                  headers: {
                      Authorization: `Bearer ${jwt}`
                  }
              });

              const userVacancies = response.data.vacancies || [];
              const userCandidates = response.data.candidates || [];
              const resDoc = status === "employer"? userVacancies : userCandidates;

              setCurrentUser({
                  userLogin: response.data.username,
                  userEmail: response.data.email,
                  userName: response.data.fullname,
                  userStatus: response.data.userStatus,
                  userJWT: jwt,
                  userImage: response.data.userAvatar ? [response.data] : [],
                  userDocs: resDoc,
                  docId: response.data.documentId,
                  id: response.data.id,
                  changeFoto: false,
                  company: status === "employer"? response.data.company : undefined,
              });

              setConfirm(true); // Устанавливаем состояние авторизации
          } catch (error) {
              console.error('Ошибка при получении данных пользователя:', error);
              localStorage.removeItem('jwt'); // Удаляем недействительный токен
              setCurrentUser(resetCurrentUser()); // Сбрасываем состояние пользователя
              setConfirm(false);
          }
      };
      fetchUserData();
  }
}, [currentUser.userStatus]);
        
  const toggleModal = useCallback(() => {
    if(regEntry)setRegEntry(!regEntry);
  }, [regEntry] ); // Выход из учетной записи

  const toggleButton = () => {if(!regEntry)setRegEntry(!regEntry)} // Вход в учетную запись (regEntry меняется на true )

      useEffect(() => { // Получение аватарки пользователя

        if ((currentUser.userName && currentUser.docId && currentUser.userImage.length < 1 
          
        ) || currentUser.changeFoto) {

          const fetchUserImage = async () => {
        
            try {const response = await axios.get(`${host}/api/Users/?filters[documentId][$eq]=${currentUser.docId}&populate=userAvatar`);
              setCurrentUser(prev => ({...prev, 
                userImage:response.data,
                changeFoto: false,
              }));
            }
            catch (error) {setError(error);} 
            finally {setLoading(false);}
          };

          fetchUserImage();
        }
  
      }, [currentUser.userName, currentUser.changeFoto, currentUser.docId, regEntry, currentUser.userImage.length]);

      useEffect(() => {// Получение списка вакансий или резюме для профиля
        const status = currentUser.userStatus;
        let recDoc = status === "employer"
          ? "=vacancies"
          : "[candidates][populate][0]=foto";
        if((currentUser.userJWT && currentUser.userStatus) || currentUser.addDoc ) {
          const fetchGetDocs = async () => {
            
            try {const response = await axios.get(`${host}/api/users/me?populate${recDoc}`, {
                  headers: {
                      Authorization: `Bearer ${currentUser.userJWT}`
                  }
              });
              const userVacancies = response.data.vacancies || [];
              const userCandidates = response.data.candidates || [];
              const resDoc = status === "employer"? userVacancies : userCandidates;
            setCurrentUser(prev => ({...prev, 
              userDocs:resDoc
            }));
            }          
            catch (error) {setError(error);} 
            finally {setLoading(false);             
            }
          };
          fetchGetDocs();
        }   
      }, [currentUser.userStatus, currentUser.userJWT, currentUser.addDoc])
       
      confirm&&toggleModal();

      useEffect(() => { // Получение списка  специальностей
        if(currentUser.docId&& !specialtiesBase) {
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
      }, [currentUser.docId, specialtiesBase]);

      useEffect(() => {// Получение списка городов
        if(currentUser.docId&& !citiesBase) {
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
      }, [currentUser.docId, citiesBase]);

  
  window.addEventListener('scroll', () => {
    document.documentElement.scrollTop >= 130 ? setFix('Fix') : setFix('');
    document.documentElement.scrollTop > document.documentElement.clientHeight ? setBtnScrollUp(true) : setBtnScrollUp(false);
  });

  return(
      <div className="container">   
        <div className="wallimage">
          <Image url={wallpaper} alt="Обои" />
        </div>
          <ModalEntry 
            host={host} 
            regEntry={regEntry} 
            modalClass={modalClass} 
            toggleModal={toggleModal} 
            confirm={confirm} 
            setConfirm={setConfirm} 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser} 
            regUser={regUser} 
            setRegUser={setRegUser}
            getDataItems={getDataItems}
            resetRegForm={resetRegForm}
            inputErrors={inputErrors}
            setInputErrors={setInputErrors}
            resetRegUser={resetRegUser}
            showProfile={showProfile}
            addDoc={addDoc}
            axios={axios}
          />

          {goodbye&&<Goodbye 
            isOpen={goodbye} 
            onClose={setGoodbye}
          />}
            
          <Header 
            regUser={regUser}
            host={host} 
            typeOfSearch = {typeOfSearch} 
            setTypeOfsearch = {setTypeOfsearch}  
            confirm={confirm} 
            setRegEntry={setRegEntry}
            mainSearchRef={mainSearchRef}
            turnExit={turnExit}
            setShowProfile={setShowProfile}
            currentUser={currentUser}
            userLogoRef={userLogoRef}
            fix={fix}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          /> 
          {showProfile&&
            <ModalEditProfile 
              modalClass={modalClass}
              showProfile={showProfile}
              setShowProfile={setShowProfile}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              host={host}
              getDataItems={getDataItems}
              axios={axios}
              type={typeOfSearch}
            />
          }

          <div className="searchBlock">
            <div className={`search ${fix}`}>
              <SearchForm
                ref={mainSearchRef}
                typeOfSearch={typeOfSearch}
              />
              {confirm &&
                <div className="btnWrap">
                  <BtnAddDoc 
                    type={typeOfSearch} 
                    setAddDoc={setAddDoc}
                  />
                </div> 
              }
              {fix && <IconEntry 
                confirm={ confirm } 
                turnExit={ turnExit } 
              />}
              {fix && <BtnBurgerMenu
                isClicked={isClicked}
                setIsClicked={setIsClicked}
              />}
                  
            </div> 
          </div>   
          {isClicked && <Navigation
            setAddDoc={setAddDoc}
            mainSearchRef={mainSearchRef}
            typeOfSearch={typeOfSearch}
            isClicked={isClicked}
            setShowProfile={setShowProfile}
            currentUser={currentUser}
            setRegEntry={setRegEntry}
            host={host}
            userLogoRef={userLogoRef}
            confirm={confirm}
            turnExit={turnExit}
            fix={fix}
            setIsClicked={setIsClicked}
          />}   
          <ResponseList typeOfSearch = {typeOfSearch} />
            {addDoc && <ModalAddDoc 
              vacArr={vacancyName} 
              type={typeOfSearch} 
              addDoc={addDoc} 
              setAddDoc={setAddDoc} 
              modalClass={modalClass} 
              host={host}
              axios={axios}
              inputErrors={inputErrors}
              citiesBase={citiesBase}
              specialtiesBase={specialtiesBase}
              getDataItems={getDataItems}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
               />
            }
          <div className="mainContainer">
            <main>
                                       
              {typeOfSearch&&currentUser?.userStatus === "employer"&&<Candidates 
                host={host}
                axios={axios}
                type={typeOfSearch}
                currentUser={currentUser}
                />}
              {!typeOfSearch&&currentUser?.userStatus === "candidate"&&<Vacancies 
                host={host} 
                setTitle={setVacancyName} 
                axios={axios}
                type={typeOfSearch}
                />} 
                   
            </main>

            <aside>
              <WeatherBlock
              axios={axios}
              />
            </aside>
            {btnScrollUp&&<button className="btnUp" 
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
                setTimeout(() => {
                  userLogoRef.current?.focus();
                }, 100);
              }}>
              <IoArrowUp className="arrowUp" />
            </button>}
          </div>
        </div>
  )
    }

    export default App