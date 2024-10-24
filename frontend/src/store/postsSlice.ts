import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDataType } from "./authSlice";
import TokenUtils from "../utils/TokenUtils";

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

export const fetchPostData = createAsyncThunk(
    "posts/fetchPostData",
    async (id: number, thunkAPI) => {
        const response = await fetch(`http://94.103.93.227/api/posts/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        console.log(data)
        thunkAPI.dispatch(setPostData(data))
    }
)

export const fetchAuthorData = createAsyncThunk(
    "posts/fethcAuthorData",
    async (id: number, thunkAPI) => {
        const response = await fetch(`http://94.103.93.227/api/users/${id}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${TokenUtils.getAccessToken()}`
            }
          })
          const data = await response.json()
          console.log(data)
          thunkAPI.dispatch(setAuthorData(data))
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
        },
        postData: {
            id: 0,
            author: {
                id: 0,
                first_name: null,
                last_name: null,
            },
            post_picture: null,
            title: null,
            body: null,
            category: null,
            created_at: null,
            read_time: null
        },
        authorData: {
            id: 0,
            username: '',
            email: '',
            profile_picture: '',
            descr: '',
            is_superuser: false,
            first_name: '',
            last_name: '',
            posts: [],
            comments: []
        } as UserDataType
    },
    reducers: {
        setPostsData(state, action) {
            state.postsData = action.payload
        },
        setPostData(state, action) {
            state.postData = action.payload
        },
        setAuthorData(state, action) {
            state.authorData = action.payload
        }
    }
})

export const { setPostsData, setPostData, setAuthorData } = postsSlice.actions
export default postsSlice.reducer
