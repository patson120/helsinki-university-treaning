import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getAllUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getById= async (userId) => {
    const response = await axios.get(`${baseUrl}/${userId}`)
    return response.data
}


export default { getAllUsers, getById }