import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
    const user = JSON.parse(window.localStorage.getItem('user'))

    const [visibilty, setVisibity] = useState(false)
    const [data, setData] = useState(blog)
    const toggleVisibility = () => {
        setVisibity(!visibilty)
    }
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const updateLike = async () => {
        const response = await blogService.update({ ...data, likes: data.likes + 1 })
        setData({ ...data, likes: response.likes })

        setBlogs(prev => prev.map(b => {
            if (b.id == data.id) {
                b.likes = b.likes + 1
            }
            return b;
        }))
    }

    const removeBlog = async () => {
        if (window.confirm('Are you sure you want to remove this blog ?')) {
            await blogService.deleteBlog(data.id)
            setBlogs(prev => prev.filter(b => b.id !== data.id))
        }
    }
    return (
        <div style={blogStyle} className='blog'>
            {data.title} {data.author} <button onClick={toggleVisibility} className='visibility'> {visibilty ? 'hide' : 'View'}</button>
            {visibilty &&
                <div>
                    <p className='url'>{data.url}</p>
                    <p className='likes'>likes: {data.likes} <button className='like' onClick={() => updateLike()}>like</button> </p>
                    <p>{data.author}</p>
                    <p>Posted by: {data.user.name}</p>
                    {user?.username === data.user.username && <button onClick={removeBlog} >Remove</button>}
                </div>
            }
        </div>
    )
}
export default Blog