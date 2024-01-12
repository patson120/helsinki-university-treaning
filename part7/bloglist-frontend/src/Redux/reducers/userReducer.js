import { createSlice } from "@reduxjs/toolkit";

import userService from '../../services/users'



const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        users: [],
        userDetail: null
    },
    reducers: {
        setUser: (state, action) => {
            return { ...state, user: action.payload.user }
        },
        setAllUsers: (state, action) => {
            return { ...state, users: action.payload.users }
        },
        setUserDetail: (state, action) => {
            return { ...state, userDetail: action.payload.user }
        },
        clearUser: (state, action) => {
            return { ...state, user: null }
        }
    }
})

export const  { setUser, clearUser, setAllUsers, setUserDetail } = userSlice.actions

export const getAllUsers = () => {
    return async dispatch => {
        const users = await userService.getAllUsers();
        dispatch(setAllUsers({ users }));
    }
}

export const getUserById = ( userId ) => {
    return async dispatch => {
        const user = await userService.getById(userId)
        dispatch(setUserDetail({user}))
    }
}

export default userSlice.reducer