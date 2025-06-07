import {useState} from "react";
import validInput from "./validInput";


const AauthorizationForm = ( {
  regOn,
  setRegOn,
  host,
  setConfirm,
  setCurrentUser,
  setInputErrors,
  inputErrors,
  axios
} ) => {
    const [userLogin, setUserLogin] = useState({
              userName: '',
              userPassword: '',
              }),
          [postFetch, setPostFetch] = useState(false),
          [loading, setLoading] = useState(true),
          [error, setError] = useState(null);

          const getDataItems = (e) => {
            const { name, value } = e.target;
            setUserLogin({ ...userLogin, [name]: value });
            validInput(value, e.target, [], setInputErrors);
        };
    
		const fetchAauthorization = async () => {
            setPostFetch(true);
			try {const response = await axios
                .post(`${host}/api/auth/local`,{
                    identifier: userLogin.userName,
                    password: userLogin.userPassword
                });
                setConfirm(response.data.user.confirmed);
                setCurrentUser(prev => ({...prev,
                   userLogin:response.data.user.username,
                   userEmail:response.data.user.email,
                   userName:response.data.user.fullname,
                   userStatus: response.data.user.userStatus,
                   userJWT:response.data.jwt,
                   docId:response.data.user.documentId,
                   id:response.data.user.id
                  }));  
                  localStorage.setItem('jwt', response.data.jwt);            
          } 
			catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
		};
    const fetchForm = (e) => {
      e.preventDefault();
      fetchAauthorization();
    }
        
    return (
      <>  
    <form id="authForm" onSubmit={fetchForm} >
      <h2 className="modalTitle">Вхід</h2>
      <p>Для входу пройдіть авторизацію, або зареєструйтеся</p>
      <input 
        autoFocus={true} 
        required 
        placeholder="Login"
        name="userName" 
        type="text" 
        minLength="3" 
        className="modalInput" 
        onChange={getDataItems}
      />
      <input 
        required
        placeholder="Password"
        name="userPassword" 
        type="password" 
        minLength="6" 
        className="modalInput" 
        onChange={getDataItems}
      />
      {(inputErrors.userName)&& <p style={{ color: 'red' }}>{inputErrors.userName}</p>}
      <button>Увійти</button>
      <p>{error&&"Вибачте, невірний логін або пароль"}</p>
      <p>{postFetch&&loading&&"Зачекайте..."}</p>
      <p>або</p>
    </form>
    <button onClick={() => setRegOn(!regOn)} >Зареєструватися</button>
     </>)
}

export default AauthorizationForm