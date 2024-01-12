import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../Redux/reducers/userReducer'

import { Link } from 'react-router-dom'


const UserList = () => {
    const dispatch =  useDispatch()

    const users = useSelector(state => state.user.users);
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    return (
        <>
            <h1>Users</h1>
            <table>
               <thead>
                    <tr>
                        <th style={{ textAlign: 'left'}}>Username</th>
                        <th>Blogs created</th>
                    </tr>
               </thead>
               <tbody>
                {
                    users.map(user => (
                        <tr key={`${user.id}`}>
                            <td style={{ minWidth: "300px"}}>
                                <Link to={`/users/${user.id}`}>
                                    { user.username }
                                </Link>
                            </td>
                            <td>{ user?.blogs.length  }</td>
                        </tr>
                    ))
                }
               </tbody>
            </table>
        </>
    )
}

export default UserList