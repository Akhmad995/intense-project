import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TokenUtils from "../utils/TokenUtils";

export const fetchUserData = createAsyncThunk(
    'auth/UserData',
    async (accessToken: string, thunkAPI) => {
        const userResponse = await fetch(`http://127.0.0.1:8000/api/users/me/`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });

        const userData = await userResponse.json();
        console.log(userData);
        thunkAPI.dispatch(setUserData(userData));
    }

)

export interface UserDataType{
    id: number,
    username: string,
    email: string,
    profile_picture: string,
    descr: string,
    is_superuser: boolean,
    first_name: string,
    last_name: string,
    posts: [],
    comments: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        authorized: localStorage.getItem('accessToken') !== null ? true : false,
        accessToken: TokenUtils.getAccessToken(),
        refreshToken: TokenUtils.getRefreshToken(),
        userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') || '{}') as UserDataType : null,
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
            localStorage.setItem('userData', JSON.stringify(action.payload));
        }
    },
})

export const { setAuthorized, setAccessToken, setRefreshToken, setUserData } = authSlice.actions;
export default authSlice.reducer;