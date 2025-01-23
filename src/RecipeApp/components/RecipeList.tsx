import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchRecipesAsync } from "../Redux/recipesSlice";
import { CircularProgress } from "@mui/material";
import RecipeCard from "./RecipeCard";
import { RootState,AppDispatch } from "../Redux/store";
import '../Styles/RecipeList.css'

const RecipeList : React.FC = () =>{
    const dispatch:AppDispatch = useDispatch();
    const {recipes,status} = useSelector((state:RootState)=>state.recipes);

    useEffect(()=>{
        dispatch(fetchRecipesAsync());
        console.log(recipes);
    },[dispatch]);

    if(status==="loading") return <div><CircularProgress/></div>
    if(status==="failed") return <div>Failed to load recipes</div>;
    return(
    <div className="recipe-list">
        {recipes.map((recipe)=>(
            <RecipeCard 
            key={recipe.id}
            title={recipe.name}
            image={recipe.image}
            cuisine={recipe.cuisine}
            rating={recipe.rating}
            timetocook={(recipe.prepTimeMinutes + recipe.cookTimeMinutes) }/>
        ))}

    </div>
    )
}

export default RecipeList;