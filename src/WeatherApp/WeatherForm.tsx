import React, { useState } from "react";

interface WeatherFormProps{
    onSearch:(city:string)=>void,
}

const WeatherForm : React.FC<WeatherFormProps> = ({onSearch})=>{
    const [city,setCity] = useState<string>("");

    const handleSubmit= (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(city.trim()===""){
            return;
        }
        onSearch(city);
        setCity("");
    }
    return(
       <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={city}
        onChange={(e)=>setCity(e.target.value)}
        placeholder="Enter City Name" 
        />
        <button type="submit">Search</button>

       </form>
    )
}

export default WeatherForm;