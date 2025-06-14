import {useEffect} from "react";

const RegForm = ( {
    pF,
    lo,
    er,
    fReg,
    setRO,
    rO,
    inputErrors,
    getDataItems,
    resetRegForm,
    setRegUser
} ) => {

    const setSubmit = (e) => {
        e.preventDefault();
        fReg();
        resetRegForm();
    };

    const getValue = (e) => {
        getDataItems(e, { setNewDoc: setRegUser, validate: true});
    };

    const radioOnChange = (e) => {
        if(e.target.type === 'radio') {
            getDataItems(e, { setNewDoc: setRegUser});
        }
    };

    useEffect(() => {
        setRegUser(prev => ({
          ...prev,
          userStatus: prev.userStatus|| "candidate",
        }));
      }, []);

    return(
        <>
            <form id="regForm" 
                onSubmit={ setSubmit }
            >
                <h2 className="modalTitle">Реєстрація</h2>
                <p>Для входу пройдіть авторизацію, або зареєструйтеся</p>
                <input 
                    autoFocus={true} 
                    required 
                    placeholder="Login" 
                    minLength="3" 
                    maxLength="30" 
                    name="userName" 
                    type="text" 
                    className="modalInput" 
                    onChange={getValue}
                />
                <input 
                    required 
                    placeholder="E-mail" 
                    name="userEmail" 
                    minLength="6" 
                    maxLength="30" 
                    type="email" 
                    className="modalInput" 
                    onChange={getValue}
                />
                <input 
                    required 
                    placeholder="Password" 
                    name="userPassword" 
                    type="password" 
                    minLength="6" 
                    className="modalInput" 
                    onChange={getValue}
                />
                
                <fieldset 
                    className="statusOption"
                    onChange={radioOnChange}
                >
                    <legend>Статус</legend>
                    <div className="statusWrapper">
                        <div>
                            <input  
                                id="employer" 
                                name="userStatus" 
                                type="radio" 
                                value="employer" 
                                className="radioInput"  />
                            <label htmlFor="employer">Работодавець</label>
                        </div>
                        <div>
                            <input  
                                id="candidate" 
                                name="userStatus" 
                                type="radio" 
                                value="candidate" 
                                className="radioInput" 
                                defaultChecked/>
                            <label htmlFor="candidate">Претендент-шукач</label>
                        </div>
                    </div>
                </fieldset>
                    {(inputErrors.userName)&& 
                        <p style={{ color: 'red' }}>{inputErrors.userName}</p>
                    }
                <button>Зареєструватися</button>
                <p>{er&&"Вибачте, користувач з таким логіном або e-mail вже існує"}</p>
                <p>{pF&&lo&&"Зачекайте..."}</p>
                <p>або</p>
            </form>
            <button onClick={() => setRO(!rO)}>
                Увійти
            </button>
        </>
    )
}

export default RegForm