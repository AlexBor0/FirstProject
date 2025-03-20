import React, { useEffect, useState, useRef } from "react";
import Info from "./info";
import Weather from "./weather";
import WeatherForm from "./WeatherForm";
import './../css/weatherBlock.css';

const API_KEY = "28d9b2aa62a7bf0937e075982e5f96f0";
const buttonsTitle = "ОТРИМАТИ";



const WeatherBlock = ({axios}) => {

   const formRef = useRef(null);

   const [infoWeather, setInfo] = useState({ 
    city: "",
    country: "Україна",
    weather: "стан",
    sunrise: "час",
    humidity: "%",
    wind: "м.с",
    pressure: "",
    error: undefined});


   const [error, setError] = useState("");

  

 
  const gettingWeather = (city) => {
    if(city) {
    const getData = async () => {               

        try {const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},ua&appid=${API_KEY}&units=metric&lang=ru`);

        if (response.data) {

            const getSuntime = (dataSun) => {
                let sun = dataSun,
                    date = new Date();
                date.setTime(sun);
                let sun_time = date.getHours() + ":" + date.getMinutes();
                return sun_time
              }

            let temp = Math.floor(response.data.main.temp)

            let infoWth = response.data.weather.map((wth, index) => (
                    <div key = {index} className="goodIcon">
                        <p>{wth.description}</p>
                            <div> 
                                <p className="temp">Т {temp}°С</p>
                                <img className="weatherIcon" src={`https://openweathermap.org/img/wn/${wth.icon}@2x.png`} alt={""}/>
                            </div>
                    </div>
                ));

            let sunrise_data = getSuntime(response.data.sys.sunrise);

            // let sunset = response.data.sys.sunset,
            //     date = new Date();
            // date.setTime(sunset);
            // let sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            

            setInfo({
            city: response.data.name,
            country: response.data.sys.country,
            weather: infoWth,
            sunrise: sunrise_data,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed,
            pressure: Math.floor(response.data.main.pressure * 0.75006),
            error: ""
            });

            setError("");

            if (formRef.current) {
            formRef.current.reset();
            }
        }
        else {setInfo({
            city: undefined,
            country: undefined,
            weather: undefined,
            sunrise: undefined,
            humidity: undefined,
            wind: undefined,
            pressure: undefined,
            error: "Введіть назву міста"
        });}

    } 
    catch (error) {
        error.message === "Request failed with status code 404"?
        setError("Місто не знайдене"):
        setError("Виникла помилка");
        console.log(error.message);
        if (formRef.current) {
            formRef.current.reset();
        }
    } 

    };

    getData();
    };}
   
    useEffect (() => {
        gettingWeather('');
    },[]);


      
    return (
        <div className="weatherBlock">
            <div className="weatherContainer">
                <div className="row">
                    <div className="info"><Info/></div>
                    <div>
                    <WeatherForm gettingWeather={gettingWeather} 
                                buttonsTitle={buttonsTitle} 
                                formRef={formRef}/>
                    <Weather 
                            city={infoWeather.city}
                            country={infoWeather.country}
                            weather={infoWeather.weather}
                            sunrise={infoWeather.sunrise}
                            humidity={infoWeather.humidity}
                            wind={infoWeather.wind}
                            pressure={infoWeather.pressure}
                            error={error}
                    />
                    </div>

                </div>

            </div>
      

        </div>

    )
}
export default WeatherBlock