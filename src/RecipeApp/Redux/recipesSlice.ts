import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecipes } from "../services/api";

interface RecipeState {
    recipes: any[];
    status : "idle"|"loading"|"failed";
}

const initialState : RecipeState = {
    recipes:[],
    status:"idle",
};

export const fetchRecipesAsync = createAsyncThunk("recipes/fetchRecipes",async()=>{
    return await fetchRecipes();
});

const recipesSlice = createSlice({
    name:"recipes",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchRecipesAsync.pending,(state)=>{
            state.status ="loading";
        })
        .addCase(fetchRecipesAsync.fulfilled, (state,action)=>{
            state.status="idle";
            state.recipes=action.payload;
        })
        .addCase(fetchRecipesAsync.rejected,(state)=>{
            state.status = "failed";
        });
    },

})

export default recipesSlice.reducer;