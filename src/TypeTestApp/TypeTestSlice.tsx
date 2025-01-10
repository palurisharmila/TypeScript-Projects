import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';


interface SentenceType {
    sentences: string[];
    currentSentence : string | null;
    loading:boolean;
    error: string|null;
}

const initialState:SentenceType = {
    sentences:[],
    currentSentence:"",
    loading:false,
    error:null,
};

export const fetchSentences = createAsyncThunk("sentences/fetchSentences", async()=>{
    try{
        const response = await fetch('https://dummyjson.com/quotes');
        if(!response.ok){
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        return data.quotes.map((item:{id:number; quote:string; author:string})=>item.quote);
    }
    catch(error:any){
        throw error.message || "Unknown error occurred"
    }
});

const sentencesSlice = createSlice({
    name:"sentences",
    initialState,
    reducers:{
        setCurrentSentence(state,action){
            state.currentSentence = action.payload;
        },
    },

    extraReducers:(builder) =>{
        builder
        .addCase(fetchSentences.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })

        .addCase(fetchSentences.fulfilled,(state,action)=>{
            state.loading =false;
            state.sentences=action.payload;
            state.currentSentence=action.payload[0] || null;
        })

        .addCase(fetchSentences.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
        });
    },

});

export const {setCurrentSentence} = sentencesSlice.actions;
export default sentencesSlice.reducer;

