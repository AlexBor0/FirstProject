import React from "react";

const ModalThenks = ({yourLogin}) => {


        return(
            <div>
                <h2>Дякуємо за реєстрацію!</h2>
                <p>Ви зареєструвалися під логіном <strong>{yourLogin}</strong></p>
                <p>Тепер ви можете зайти у свій акаунт, використовуючи реєстраційні дані</p>
                <p></p>
            </div>
        );    
    };

export default ModalThenks