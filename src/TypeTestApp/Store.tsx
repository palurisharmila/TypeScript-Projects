import {configureStore} from "@reduxjs/toolkit";
import sentenceReducer  from "./TypeTestSlice";

export const store =configureStore({
    reducer:{
        sentences : sentenceReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;