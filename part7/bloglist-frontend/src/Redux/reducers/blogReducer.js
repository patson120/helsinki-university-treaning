
import { createSlice } from '@reduxjs/toolkit'

import blogService from '../../services/blogs'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs: (state, action) => {
            return action.payload.blogs
        },
        createNewBlog: (state, action) => {
            return [ action.payload.blog,  ...state ]
        },
        deleteBlog: (state, action) => {
            return state.filter(blog => blog.id !== action.payload.id)
        },
        updateBlogLike: (state, action) => {
            return state.map(blog => blog.id === action.payload.blog.id ? action.payload.blog : blog)
        }
    }
})

export const  { setBlogs, createNewBlog, deleteBlog, updateBlogLike } = blogsSlice.actions


export const createBlog = ( newBlog ) => {
    return async dispatch => {
        const blog = await blogService.create(newBlog)
        dispatch(createNewBlog({blog}))
    }
}

export const deleteBlogById = ( id ) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch(deleteBlog({ id }))
    }
}


export const updateLike = ( blog ) => {
    return async dispatch => {
        const response = await blogService.update(blog)
        dispatch(updateBlogLike({ blog: response }))
    }
}

export default blogsSlice.reducer