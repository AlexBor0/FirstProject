import React, { useState } from "react";

const Weather = (props) => {

const buttonUp = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  {/* !Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
   <path fill="white" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>),
      buttonDown = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  {/* !Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
   <path fill="white" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>);

const [showMore, setShowMore] = useState(false);

const toggleContent = () => {
  setShowMore(!showMore)
}
  
  return(
        <div className="weather">
        {props.city &&
          <div>
            <p>м.{props.city}({props.country})</p>
            <div>{props.weather}
              <button className="showButton" onClick={toggleContent}>{showMore? buttonUp: buttonDown}</button>
            </div>{showMore&&
              (<>    
                  <p>Схід сонця о {props.sunrise}</p>
                  <p>Вологість {props.humidity} %</p>
                  <p>Шв. вітру {props.wind} м/с</p>
                  <p>Повітряний тиск {props.pressure} мм.рт.ст</p>
                </>)}
              <p>{props.error}</p>
          </div>
      }
        </div>
  )}

export default Weather