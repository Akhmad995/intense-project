import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface postsData {
    count: number,
    next: string,
    previous: string,
    results: [
        {
            id: number,
            author: {
                id: string,
                first_name: string,
                last_name: string,
            }
            post_picture: string,
            title: string,
            body: string,
            category: string,
            created_at: string,
            read_time: string
        }
    ]
}

export const fetchPostsData = createAsyncThunk(
    "posts/fetchPostsData",
    async (_, thunkAPI) => {
        const response = await fetch('http://94.103.93.227/api/posts/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        console.log(data)
        thunkAPI.dispatch(setPostsData(data))
    }
)

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        postsData: {
            count: 0,
            next: null,
            previous: null,
            results: []
        }
    },
    reducers: {
        setPostsData(state, action) {
            state.postsData = action.payload
        }
    }
})

export const { setPostsData } = postsSlice.actions
export default postsSlice.reducer
