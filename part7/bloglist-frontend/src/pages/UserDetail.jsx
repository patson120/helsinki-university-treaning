import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../Redux/reducers/userReducer'
import { useMatch } from 'react-router-dom'


const UserDetail = () => {
    const dispatch =  useDispatch()
    const match = useMatch('/users/:id')

    if (!match) return null;
    
    const user = useSelector(state => state.user.userDetail);

    useEffect(() => {
        dispatch(getUserById(match.params.id))
    }, [])
    return (
        <>
           {
            user && 
                <>
                    <h2>{ user.username }</h2>
                    <h5>Added blogs</h5>
                    <ul>
                        {
                            user.blogs.map(blog => <li key={`${blog.id}`}>{ blog.title }</li>  )
                        }
                    </ul>
                </>
            }
        </>
    )
}

export default UserDetail