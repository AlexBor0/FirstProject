import React from "react";

const WeatherForm = ({gettingWeather, formRef, buttonsTitle}) => {
    
        let city;

        const sendForm = (e) => {
            if (city) {
                e.preventDefault();
                gettingWeather(city);
            }      
        }
     
    return(
        <div className="weatherForm">
            <form id="weatherForm" ref={formRef} onSubmit={sendForm}>
                <input type="text" name="city" autoComplete="off" placeholder="Місто" 
                    onChange={(e) => city = (e.target.value)}/>
                 <button>{buttonsTitle}</button>
            </form>
        </div>
    )
}
export default WeatherForm