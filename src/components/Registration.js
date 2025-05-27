import {useState} from "react";
import RegForm from "./RegForm";
import ModalThenks from "./ModaThenks";

const RegistrationForm = ({
  setRegOn,
  regOn,
  regUser,
  setRegUser,
  host,
  inputErrors,
  resetRegForm,
  getDataItems,
  axios
}) => {

    const [yourLogin, setYourLogin] = useState(undefined);
    const [postFetch, setPostFetch] = useState(false),
          [loading, setLoading] = useState(true),
          [error, setError] = useState(null);

    const fetchRegistration = async () => {
        setYourLogin(regUser.userName);
        setPostFetch(true);
        let JWT = null,
            Id = null;

			try {const response = await axios
                .post(`${host}/api/auth/local/register`,{
                    username: regUser.userName,
                    email: regUser.userEmail,
                    password: regUser.userPassword,
                });

             JWT = response.data.jwt;
             Id = response.data.user.id;

        if (JWT&&Id) {
            const userData = {
                userStatus: regUser.userStatus,
              };
    
            const updateResponse = await axios.put(
              `${host}/api/users/${Id}`,
              userData,
              {
                headers: {
                  Authorization: `Bearer ${JWT}`,
                },
              }
            );
    
            if (updateResponse.status !== 200) {
              throw new Error("Помилка при оновленні даних користувача");
            } else {
              setRegUser((prevState => ({...prevState, userConfirmed: response.data.user.confirmed })));
              console.log("Реєстрація успішна")
            };
        }     
            } 
			catch (error) {setError(error);} 
			finally {setLoading(false);}
		};
          
    return (
    <>
        {!regUser.userConfirmed&&<RegForm 
            pF={postFetch} 
            lo={loading} 
            er={error} 
            fReg={fetchRegistration} 
            setRO={setRegOn} 
            rO={regOn} 
            inputErrors={inputErrors}
            getDataItems={getDataItems}
            resetRegForm={resetRegForm}
            setRegUser={setRegUser}
            />
        }

        {regUser.userConfirmed&&<ModalThenks yourLogin={yourLogin}/>}
    </>)
}

export default RegistrationForm