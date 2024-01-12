import React, { useEffect, useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlogById, setBlogs, updateLike, commentBlog } from '../Redux/reducers/blogReducer'


const BlogDetail = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [blog, setBlog] =  useState(null)
    const [comment, setComment] =  useState("")
    const match = useMatch('/blogs/:id')

    if (!match) return null;
    
    const user = useSelector(state => state.user.user)
    const blogs = useSelector(state => state.blogs)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await blogService.getById(match.params.id)
                setBlog(response)
            } catch (error) {
                setBlog(null)
            }
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
            navigate('/')
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        const newBlog = { ...blog, comments: [ comment, ...blog.comments]}
        dispatch(commentBlog(newBlog))
        setBlog(newBlog)
        dispatch(setBlogs({ blogs: blogs.map(b => b.id === newBlog.id ? newBlog : b) }))
        setComment('')
    }

    return (
        <>
           {
            blog && 
                <div className='mt-4'>
                    <h2>{ blog.title }</h2>
                    <div>
                        <p className='url'>{blog.url}</p>
                        <p className='likes'>likes: {blog.likes} 
                            <button
                                type='button'style={{
                                    marginLeft: '30px',
                                }}
                                className='like btn btn-secondary'
                                onClick={() => updateBlogLike()}>
                                    like
                            </button>
                        </p>
                        <p>{blog.author}</p>
                        <p>Posted by: { blog.user.name } </p>
                        { 
                            user?.username === blog.user.username && 
                            <button type='button' className='btn btn-danger' onClick={removeBlog} >Remove</button>
                        }
                    </div>
                    <h3 className='my-4'>Comments</h3>
                    <div className='mb-3'>
                        <form onSubmit={handleSubmit} className='d-flex'>
                            <input
                                className='title title form-control form-control-md w-25' 
                                type="text" value={comment} 
                                onChange={(event) => setComment( event.target.value )} 
                                placeholder='Type to comment'
                            />
                            <button type='submit' className='btn btn-primary' >Add comment</button>
                        </form>
                    </div>
                    <ul className='ul'>
                        {
                            blog?.comments.map((comment, index) => (<li className='li my-2' key={index}>{ comment }</li>))
                        }
                    </ul>
                </div>
            }
            {
                !blog && <p className='text-light'>Not found</p>
            }
        </>
    )
}

export default BlogDetail