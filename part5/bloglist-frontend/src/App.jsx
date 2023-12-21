import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blog, setBlog] = useState({ title: '', author: '', url: '', likes: 0})
  const [notification, setNotification] = useState(null)
  const [className, setClassName] = useState('');

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  useEffect(() => {
    blogService.getAll()
      .then((blogs) => setBlogs(blogs))
      .catch(error => {
        console.log("Error: ", error.message);
        setNotification(error.message)
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

  const createblog = async () => {
    try {
      const newBlog = await blogService.create(blog);
      setBlogs(prev => [newBlog, ...prev,])
      setBlog({ title: '', author: '', url: '', likes: 0})
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
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in
          <button onClick={logout}  >logout</button>
        </p>
        <div>
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
            <button onClick={createblog} >Create</button>
          </div>
        </div>
        <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
      }
    </>
  )
}

export default App