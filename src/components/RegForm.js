import React from "react";

const RegForm = ({pF, lo, er, fReg, setRO, rO, inputErrors, getDataItems, resetRegForm}) => {

    const setSubmit = (e) => {
        e.preventDefault();
        fReg();
        resetRegForm();
    }

    return(
        <>
        <form id="regForm" 
            onSubmit={ setSubmit }
        >
            <h2 className="modalTitle">Реєстрація</h2>
            <p>Для входу пройдіть авторизацію, або зареєструйтеся</p>
            <input autoFocus={true} required placeholder="Login" minLength="3" maxLength="30" name="userName" type="text" className="modalInput" 
                 onChange={getDataItems}
            />
            <input required placeholder="E-mail" name="userEmail" minLength="6" maxLength="30" type="email" className="modalInput" 
                 onChange={getDataItems}
            />
            <input required placeholder="Password" name="userPassword" type="password" minLength="6" className="modalInput" 
                onChange={getDataItems}
            />
            {(inputErrors.userName)&& <p style={{ color: 'red' }}>{inputErrors.userName}</p>}
             <button>Зареєструватися</button>
            <p>{er&&"Вибачте, користувач з таким логіном або e-mail вже існує"}</p>
            <p>{pF&&lo&&"Зачекайте..."}</p>
            <p>або</p>
        </form>
        <button 
            onClick={() => setRO(!rO)}
             >Увійти</button>
        </>
    )
}

export default RegForm