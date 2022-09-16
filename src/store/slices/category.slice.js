import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({

    name: "category",
    initialState: {
        listCategories: [], // ici on est libre sur le nommage de la key et l'affection de la value (preferer un array)
    },
    reducers: {
        loadCategories(state, action){
            state.listCategories = [...action.payload];
        }
    },

});

export const {loadCategories} = categorySlice.actions;

export default categorySlice.reducer;