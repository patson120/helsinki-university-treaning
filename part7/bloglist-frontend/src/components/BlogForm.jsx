import React, { useState } from 'react'


const BlogForm = ({ create }) => {
    const [blog, setBlog] = useState({ title: '', author: '', url: '', likes: 0 })

    const createBlog = () => {
        create(blog)
        setBlog({ title: '', author: '', url: '', likes: 0 })
    }

    return <>
        <h1>Create new</h1>
        <div className='mt-4'>
            Title:
            <input 
                className='title form-control form-control-md w-25' 
                type="text"
                value={blog?.title}
                onChange={(event) => setBlog(prev => ({ ...prev, title: event.target.value }))} 
            />
        </div>
        <div>
            Autor:
            <input 
                className='author title form-control form-control-md w-25' 
                type="text"
                value={blog?.author}
                onChange={(event) => setBlog(prev => ({ ...prev, author: event.target.value }))}
            />
        </div>
        <div>
            URL:
            <input
                className='url title form-control form-control-md w-25' 
                type="url"
                value={blog?.url}
                onChange={(event) => setBlog(prev => ({ ...prev, url: event.target.value }))}
            />
        </div>
        <div className='my-3'>
            <button type="button" className="btn btn-primary" onClick={createBlog} >Create</button>
        </div>
    </>
}

export default BlogForm