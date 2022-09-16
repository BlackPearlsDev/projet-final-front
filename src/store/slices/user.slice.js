import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name: "user",
    initialState: {
        userInfos: null,
        isLogged: false,
    },
    reducers: {
        login(state, action){
            console.log(action)
            state.userInfos = action.payload;
            state.isLogged = true;
        },
        logout(state){
            state.userInfos = null;
            state.isLogged = false;
        }
    },

});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;