import { useEffect, useState } from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { createBlog, setBlogs } from './Redux/reducers/blogReducer'
import { setNotification } from './Redux/reducers/notificationReducer'
import BlogList from './components/BlogList'
import { clearUser, setUser } from './Redux/reducers/userReducer'

const App = () => {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)
    const user = useSelector(state => state.user)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [className, setClassName] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem(
                'user', JSON.stringify(user)
            )
            
            dispatch(setUser({user}))
            setUsername('')
            setPassword('')
        } catch (error) {
            dispatch(setNotification({text: error.message}));
            setClassName('error')
            setTimeout(() => {
                dispatch(setNotification({text: null}));
                setClassName('')
            }, 3000)
        }
    }

    useEffect(() => {
        blogService.getAll()
            .then((blogsList) => {
                // sort by likes descending
                blogsList.sort((a, b) => b.likes - a.likes)
                dispatch(setBlogs({blogs: blogsList}));
            })
            .catch(error => {
                if (error.response.status === 401) {
                    logout()
                }
                dispatch(setNotification({text: error.response.data.error}))
                setClassName('error')
                setTimeout(() => {
                    dispatch(setNotification({text: null}))
                    setClassName('')
                }, 3000)
            })
    }, [user])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user')
        if (loggedUserJSON) {
            const data = JSON.parse(loggedUserJSON)
            dispatch(setUser({user: data}))
        }
    }, [])

    const logout = () => {
        window.localStorage.removeItem('user')
        dispatch(clearUser())
    }

    const createblog = async (blog) => {
        try {
            dispatch(createBlog(blog))
            dispatch(setNotification({text: `A new blog ${blog.title} by ${blog.author} added`}))

            setClassName('success')
            setTimeout(() => {
                dispatch(setNotification({text: null}))
                setClassName('')
            }, 3000)
        } catch (error) {
            dispatch(setNotification({text: error.message}))
            setClassName('error')
            setTimeout(() => {
                dispatch(setNotification({text: null}))
                setClassName('')
            }, 3000)
        }
    }
    return (
        <>
            <Notification message={notification} className={className} />

            {!user && <Togglable buttonLabel='login'>
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin}
                />
            </Togglable>}

            {user &&
                <div>
                    <p>{user.name} logged in
                        <button onClick={logout} >logout</button>
                    </p>
                    <Togglable buttonLabel='New blog'>
                        <BlogForm create={createblog} />
                    </Togglable>
                   <BlogList />
                </div>
            }
        </>
    )
}

export default App