import React, { useState } from "react";
import WeatherForm from "./WeatherForm";
import WeatherDisplay from "./WeatherDisplay";
import { WeatherType } from "./WeatherType";
import axios from "axios";

const WeatherComponents:React.FC=()=>{
    const [weatherData,setWeatherData] = useState<WeatherType | null>(null);
    const [ loading,setloading] = useState(false);
    const [error,setError] = useState<string|null>(null);

    const fetchWeather = async(city:string)=>{
        setloading(true);
        setError(null);
        try{
            const API_KEY = "e7bbd89de3f365fa5e50bb8d475d3cde";
            const response = await axios.get<WeatherType>(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

            );
            setWeatherData(response.data);
        }
        catch(err){
            setError("City not Found");
        }
        finally{
            setloading(false);
        }
    }

    return(
        <div>
            <h1>Weather App</h1>
            <WeatherForm onSearch={fetchWeather} />
            <WeatherDisplay data={weatherData} loading={loading} error={error}/>   
        </div>
    );
}; 
export default WeatherComponents;