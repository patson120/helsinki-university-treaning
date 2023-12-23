import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [className, setClassName] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'user', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification(error.message)
      setClassName("error")
      setTimeout(() => {
        setNotification(null)
        setClassName('')
      }, 3000);
    }
  }

  useEffect(() => {
    blogService.getAll()
      .then((blogs) => {
        // sort by likes descending
        blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(blogs)
      })
      .catch(error => {
        if (error.response.status === 401) {
          logout()
        }
        setNotification(error.response.data.error)
        setClassName("error")
        setTimeout(() => {
          setNotification(null)
          setClassName('')
        }, 3000);
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const createblog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);
      setBlogs(prev => [newBlog, ...prev,])
      setNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setClassName("success")
      setTimeout(() => {
        setNotification(null)
        setClassName('')
      }, 3000);
    } catch (error) {
      setNotification(error.message)
      setClassName("error")
      setTimeout(() => {
        setNotification(null)
        setClassName('')
      }, 3000);
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
          <Togglable buttonLabel="New blog">
            <BlogForm create={createblog} />
          </Togglable>
          <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
            )}
          </div>
        </div>
      }
    </>
  )
}

export default App