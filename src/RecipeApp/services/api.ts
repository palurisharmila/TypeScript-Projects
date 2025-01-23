import axios from 'axios';

const url = "https://dummyjson.com/recipes";

export const fetchRecipes = async()=>{
    const response = await axios.get(url);
    return response.data.recipes;

}

export const fetchRecipesById = async(id:number)=>{
    const response=await axios.get(`${url}/${id}`);
    return response.data;
}