import React from "react";
import { WeatherType } from "./WeatherType";

interface WeatherDisplayProps {
    data:WeatherType|null;
    loading:boolean;
    error:string|null;
} 

const WeatherDisplay : React.FC<WeatherDisplayProps> =({data,loading,error})=>{

    if(loading){
        return(
        <p>Loading</p>
        )
    }
    if(error){
        return(
            <p>Error:{error}</p>
        )
    }
    if(!data) return null;
    return (
        <div>
            <h2>Weather in {data.name}</h2>
            <p> Description: {data.weather[0].description}</p>
            <p>Temperature: {(data.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Humidity:{data.main.humidity}%</p>
            </div>
    )
}

export default WeatherDisplay;