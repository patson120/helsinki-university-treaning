import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'


const getToken = () => {
    let BEARER_TOKEN = ''
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
        BEARER_TOKEN = `Bearer ${JSON.parse(window.localStorage.getItem('user')).token}`
    }
    return BEARER_TOKEN
}

const config = { headers: { Authorization: getToken() }}

const getAll = () => {
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = (blog) => {
    const request = axios.post(baseUrl, blog, config)
    const localData = JSON.parse(window.localStorage.getItem('user'))
    return request.then(response => {
        return  { ...response.data, user: { id: blog.user,name: localData.name,username: localData.username } }
    })
   
}

const getById= async (blogId) => {
    const response = await axios.get(`${baseUrl}/${blogId}`, config)
    return response.data
}


const update = (blog) => {
    blog = {...blog, likes: blog.likes + 1}
    const request = axios.put(`${baseUrl}/${blog.id}`, blog, config)
    return request.then(response => response.data)
}

const deleteBlog = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)
}

export default { getAll, create, getById, update, deleteBlog, getToken }