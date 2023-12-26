import React, { useState } from 'react'


const BlogForm = ({ create }) => {
    const [blog, setBlog] = useState({ title: '', author: '', url: '', likes: 0 })

    const createBlog = () => {
        create(blog)
        setBlog({ title: '', author: '', url: '', likes: 0 })
    }

    return <>
        <h1>Create new</h1>
        <div>
            Title: <input className='title' type="text" value={blog?.title} onChange={(event) => setBlog(prev => ({ ...prev, title: event.target.value }))} />
        </div>
        <div>
            Autor: <input className='author' type="text" value={blog?.author} onChange={(event) => setBlog(prev => ({ ...prev, author: event.target.value }))} />
        </div>
        <div>
            URL: <input className='url' type="url" value={blog?.url} onChange={(event) => setBlog(prev => ({ ...prev, url: event.target.value }))} />
        </div>
        <div>
            <button className='btn-create' onClick={createBlog} >Create</button>
        </div>
    </>
}

export default BlogForm