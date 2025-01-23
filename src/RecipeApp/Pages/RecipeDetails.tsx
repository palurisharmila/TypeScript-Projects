import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { fetchRecipesById } from "../services/api";
 import { CircularProgress } from "@mui/material";
 import '../Styles/RecipsDetails.css'

const RecipeDetails : React.FC = () =>{
    const {id} = useParams<{id:string}>();
    const [recipe,setRecipe] = useState<any>(null);

    useEffect(()=>{
        const fetchData = async () =>{
            const data = await fetchRecipesById(Number(id));
            setRecipe(data);
        };
        fetchData();
    },[id]);

    if(!recipe) return <div><CircularProgress/></div>;

    return(
        <div className="recipe-details">
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title}/>
            <h3>{recipe.cuisine}</h3>
            <p>{recipe.ingredients}</p>
            <p>{recipe.instructions}</p>

        </div>
    )

}
export default RecipeDetails;