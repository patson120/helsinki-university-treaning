import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlogById, updateLike} from '../Redux/reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
    // const user = useSelector(state => state.user.user)
    // const dispatch = useDispatch()

    const [data, setData] = useState(blog)
    // const [visibilty, setVisibity] = useState(false)
    // const toggleVisibility = () => {
    //     setVisibity(!visibilty)
    // }
    
    // const updateBlogLike = async () => {
    //     dispatch(updateLike(data))
    //     setData({ ...data, likes: data.likes + 1 })
    // }

    // const removeBlog = async () => {
    //     if (window.confirm('Are you sure you want to remove this blog ?')) {
    //         dispatch(deleteBlogById(blog.id))
    //     }
    // }
    return (
        <div className='blog p-3 pl-3 mb-3 border-0 bg-light rounded'>
            <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none'}}>
                {data.title} {data.author} 
            </Link>
            
            {/* <button onClick={toggleVisibility} className='visibility'> {visibilty ? 'hide' : 'View'}</button>
            {visibilty &&
                <div>
                    <p className='url'>{data.url}</p>
                    <p className='likes'>likes: {data.likes} <button className='like' onClick={() => updateBlogLike()}>like</button> </p>
                    <p>{data.author}</p>
                    <p>Posted by: {data.user.name}</p>
                    {user?.username === data.user.username && <button onClick={removeBlog} >Remove</button>}
                </div>
            } */}
        </div>
    )
}

export default Blog
