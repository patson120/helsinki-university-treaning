import React, { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlogById, setBlogs, updateLike } from '../Redux/reducers/blogReducer'


const BlogDetail = () => {

    const dispatch = useDispatch()

    const [blog, setBlog] =  useState(null)
    const match = useMatch('/blogs/:id')

    if (!match) return null;
    
    const user = useSelector(state => state.user.user)
    const blogs = useSelector(state => state.blogs)

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await blogService.getById(match.params.id)
            setBlog(response)
        }
        fetchBlog()
    }, [match.params.id])


    const updateBlogLike = async () => {
        dispatch(updateLike(blog))
        setBlog({ ...blog, likes: blog.likes + 1 })
        dispatch(setBlogs({ blogs: blogs.map(b => b.id === blog.id ? { ...blog, likes: blog.likes + 1 } : b) }))
    }

    const removeBlog = async () => {
        if (window.confirm('Are you sure you want to remove this blog ?')) {
            dispatch(deleteBlogById(blog.id))
        }
    }

    return (
        <>
           {
            blog && 
                <>
                    <h2>{ blog.title }</h2>
                    <div>
                        <p className='url'>{blog.url}</p>
                        <p className='likes'>likes: {blog.likes} <button className='like' onClick={() => updateBlogLike()}>like</button> </p>
                        <p>{blog.author}</p>
                        <p>Posted by: {blog.user.name}</p>
                        {user?.username === blog.user.username && <button onClick={removeBlog} >Remove</button>}
                    </div>
                </>
            }
        </>
    )
}

export default BlogDetail