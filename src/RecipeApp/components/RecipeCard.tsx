import React from "react";
import '../Styles/RecipeCard.css'
interface RecipeCardProps{
    title: string;
    cuisine:string,
    image:string,
    rating:number;
    timetocook:number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({title,cuisine,image,rating,timetocook})=>(
    <div className="recipe-card">
        <h2>{title}</h2>
        <img src={image} alt={title}/>
        <h4>Cuisine:{cuisine}</h4>
        <h4>Rating:{rating}</h4>
        <h4>Time To Cook:{timetocook}mins</h4>

    </div>
);

export default RecipeCard;