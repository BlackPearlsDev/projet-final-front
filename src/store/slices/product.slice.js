import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({

    name: "product",
    initialState: {
        list: [],
    },
    reducers: {
        loadProducts(state, action){
            state.list = [...action.payload];
        },
    },

});

export const {loadProducts} = productSlice.actions;

export default productSlice.reducer;