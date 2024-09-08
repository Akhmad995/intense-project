import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authorized: localStorage.getItem('authorized') === 'true' ? true : false,
        accessToken: null,
        refreshToken: null,
        userData: null
    },
    reducers: {
        setAuthorized(state) {
            state.authorized = !state.authorized
            localStorage.setItem('authorized', state.authorized.toString())
        },
        setAccessToken(state, action) {
            state.accessToken = action.payload;
        },
        setRefreshToken(state, action) {
            state.refreshToken = action.payload;
        },
        setUserData(state, action) {
            state.userData = action.payload;
        }
    },
})

export const { setAuthorized, setAccessToken, setRefreshToken, setUserData } = authSlice.actions;
export default authSlice.reducer;