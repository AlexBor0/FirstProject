import { useEffect } from "react";
import { FcOk } from "react-icons/fc";
import { IoCloseCircleSharp } from "react-icons/io5";
import './../css/MessagePost.css';

const MessagePost = ({
    isOpen,
    onClose,
    closeItem,
    typeOfDoc,
    newClass,
    setPostFetch,
    editable,
    currentUser,
    setCurrentUser,
    setLoading,
    axios,
    host
 }) => {

    

    const document = typeOfDoc==="Компанія"? "Інформацію про компанію додано!" : (typeOfDoc? "Вакансія успішно опублікована": "Резюме успішно опубліковано");
    const status = currentUser.userStatus;
    let recDoc = status === "employer"
          ? "[company][populate][logo]=true&populate[vacancies]=true"
          : "[candidates][populate][0]=foto"; 

     const fetchGetInfo = async () => {
        const jwt = currentUser.userJWT;
        setLoading(true);
 
        try 
            {

                const response = await axios.get( `${host}/api/users/me?populate${recDoc}`
                        , {
                            headers: {
                            Authorization: `Bearer ${jwt}`
                        }
                        });

                        if (status === "employer") {
                            setCurrentUser(prev => ({...prev, company: response.data.company}));
                            setCurrentUser(prev => ({...prev, userDocs: response.data.vacancies}));
                        }
                        if (status === "candidate") {
                            setCurrentUser(prev => ({...prev, userDocs: response.data.candidates}));
                        }

            }
            
        catch (error) {
            console.error('Помилка отримання данних:', error);
        } finally {
            setLoading(false);
        }
       
    };

    const closeMessagePost = () => {
        if (editable) {
           fetchGetInfo();
        } 
        onClose(null);
        closeItem(false);
        // if (!editable) {
        //     setPostFetch(false);
        // }
    }
    
    useEffect(() => {
        if(isOpen) {
            const timer = setTimeout(() => {
                closeMessagePost()

            }, 2000);
            return () => clearTimeout(timer);
        }
        
    });

    if (!isOpen) return null;

    

    return(
        <div className={ newClass }>
            <div>
                    <FcOk className="ok-icon"/>
                </div>
            
            <div className="messagePost">
                
                <div>
                    <h3>{document}</h3>
                    <p>Через декілька хвилин {typeOfDoc? "вона" : "воно"} з'явиться у {typeOfDoc==="Компанія"? "вашому профілі" : "пошуку"}</p>
                </div> 
                
                    
            </div>
                <button className="pageBtn">
                    <IoCloseCircleSharp 
                        className="delete-icon" 
                        onClick = {closeMessagePost}
                        />
                </button>
        </div>
    )
}

export default MessagePost