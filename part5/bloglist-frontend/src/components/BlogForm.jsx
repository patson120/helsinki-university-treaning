import React, { useState } from 'react';


const BlogForm = ({ create }) => {
    const [blog, setBlog] = useState({ title: '', author: '', url: '', likes: 0 })


    const createBlog = () => {
        create(blog)
        setBlog({ title: '', author: '', url: '', likes: 0 })
    }

    return <>
        <h1>Create new</h1>
        <div>
            Title: <input type="text" value={blog?.title} onChange={(event) => setBlog(prev => ({ ...prev, title: event.target.value }))} />
        </div>
        <div>
            Autor: <input type="text" value={blog?.author} onChange={(event) => setBlog(prev => ({ ...prev, author: event.target.value }))} />
        </div>
        <div>
            URL: <input type="url" value={blog?.url} onChange={(event) => setBlog(prev => ({ ...prev, url: event.target.value }))} />
        </div>
        <div>
            <button onClick={createBlog} >Create</button>
        </div>
    </>
}

export default BlogForm;