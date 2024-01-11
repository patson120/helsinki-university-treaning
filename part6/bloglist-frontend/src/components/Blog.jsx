import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlogById, updateLike} from '../Redux/reducers/blogReducer'

const Blog = ({ blog }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

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
    const updateBlogLike = async () => {
        dispatch(updateLike(data))
        setData({ ...data, likes: data.likes + 1 })
    }

    const removeBlog = async () => {
        if (window.confirm('Are you sure you want to remove this blog ?')) {
            dispatch(deleteBlogById(blog.id))
        }
    }
    return (
        <div style={blogStyle} className='blog'>
            {data.title} {data.author} <button onClick={toggleVisibility} className='visibility'> {visibilty ? 'hide' : 'View'}</button>
            {visibilty &&
                <div>
                    <p className='url'>{data.url}</p>
                    <p className='likes'>likes: {data.likes} <button className='like' onClick={() => updateBlogLike()}>like</button> </p>
                    <p>{data.author}</p>
                    <p>Posted by: {data.user.name}</p>
                    {user?.username === data.user.username && <button onClick={removeBlog} >Remove</button>}
                </div>
            }
        </div>
    )
}
export default Blog