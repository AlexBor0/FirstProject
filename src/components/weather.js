import { useState } from "react";

const Weather = ({infoWeather, error}) => {

const buttonUp = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
   <path fill="white" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>),
      buttonDown = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
   <path fill="white" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>);

const [showMore, setShowMore] = useState(false);

const toggleContent = () => {
  setShowMore(!showMore)
}
  
  return(
        <div className="weather">
        {infoWeather.city &&
          <div>
            <p>м.{infoWeather.city}({infoWeather.country})</p>
            <div>{infoWeather.weather}
              <button className="showButton" onClick={toggleContent}>{showMore? buttonUp: buttonDown}</button>
            </div>{showMore&&
              (<>    
                  <p>Схід сонця о {infoWeather.sunrise}</p>
                  <p>Вологість {infoWeather.humidity} %</p>
                  <p>Шв. вітру {infoWeather.wind} м/с</p>
                  <p>Повітряний тиск {infoWeather.pressure} мм.рт.ст</p>
                </>)}
              <p>{error}</p>
          </div>
      }
        </div>
  )}

export default Weather