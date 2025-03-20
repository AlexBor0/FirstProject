import React, {useState} from "react";
import RegForm from "./RegForm";
import ModalThenks from "./ModaThenks";

const RegistrationForm = ({setRegOn, regOn, regUser, setRegUser, host, validInput, inputErrors,  resetRegForm, axios}) => {

    const [yourLogin, setYourLogin] = useState(undefined);
    const [postFetch, setPostFetch] = useState(false),
          [loading, setLoading] = useState(true),
          [error, setError] = useState(null);

    const getDataItems = (e) => {
            const { name, value } = e.target;
            setRegUser({ ...regUser, [name]: value });
            validInput(value, e.target);
        };

    const fetchRegistration = async () => {
        setYourLogin(regUser.userName);
        setPostFetch(true);

			try {const response = await axios
                .post(`${host}/api/auth/local/register`,{
                    username: regUser.userName,
                    email: regUser.userEmail,
                    password: regUser.userPassword
                });

        // setRegUser((prevState => ({...prevState, userJWT: response.data.jwt })))
        setRegUser((prevState => ({...prevState, userConfirmed: response.data.user.confirmed })));
        
		console.log("новый пользователь");
               
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
            />
        }

        {regUser.userConfirmed&&<ModalThenks yourLogin={yourLogin}/>}
    </>)
}

export default RegistrationForm