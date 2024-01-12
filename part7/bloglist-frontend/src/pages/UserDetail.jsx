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
                <div className='mt-4'>
                    <h2 className='h2'>{ user.username }</h2>
                    <h5 className='my-4 h5'>Added blogs</h5>
                    <ul className='ul'>
                        {
                            user.blogs.map(blog => <li className='li my-2' key={`${blog.id}`}>{ blog.title }</li>  )
                        }
                    </ul>
                </div>
            }
        </>
    )
}

export default UserDetail