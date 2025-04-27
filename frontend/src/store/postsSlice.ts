import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType } from "./authSlice";
import TokenUtils from "../utils/TokenUtils";

export type Post = {
    id: number,
    author: {
        id: number,
        first_name: string,
        last_name: string,
    }
    post_picture: string,
    title: string,
    body: string,
    category: string,
    created_at: string,
    read_time: string
    my_reaction: boolean
}

export interface postsData {
    count: number,
    next: string,
    previous: string,
    results: Post[]
}

export const fetchPostsData = createAsyncThunk(
    "posts/fetchPostsData",
    async (_, thunkAPI) => {
        const response = await fetch('http://127.0.0.1:8000/api/posts/', {
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
        const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}/`, {
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
    "posts/fetchAuthorData",
    async (id: number, thunkAPI) => {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        console.log(data)
        thunkAPI.dispatch(setAuthorData(data))
    }
)

export const fetchPostReaction = createAsyncThunk(
    "posts/fetchPostReaction",
    async ({ id, likeState }: { id: number; likeState: string | null }, { dispatch }) => {
        const response = await fetch('http://127.0.0.1:8000/api/reactions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TokenUtils.getAccessToken()}`
            },
            body: JSON.stringify({post: id, value: likeState })
        });
        const data = await response.json();
        console.log(data);

        dispatch(setPostReaction({ id, likeState }));
        return data;
    }
);

export const savedLikedPosts = JSON.parse(localStorage.getItem("IdLikedPosts") || "[]");

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
            read_time: null,
            my_reaction: null as string | null
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
        } as UserDataType,
        IdlikedPosts: savedLikedPosts as number[]
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
        },
        setPostReaction(state, action: PayloadAction<{ id: number; likeState: string | null }>) {
            const { id, likeState } = action.payload;
            state.postData.my_reaction = likeState;

            if (likeState) {
                if (!state.IdlikedPosts.includes(id)) {
                    state.IdlikedPosts.push(id);
                }
            } else {
                state.IdlikedPosts = state.IdlikedPosts.filter(postId => postId !== id);
            }

            localStorage.setItem("IdLikedPosts", JSON.stringify(state.IdlikedPosts));
        }
    }
})

export const { setPostsData, setPostData, setAuthorData, setPostReaction } = postsSlice.actions
export default postsSlice.reducer