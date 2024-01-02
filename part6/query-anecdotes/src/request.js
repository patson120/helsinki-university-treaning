import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

export const getAnecdotes = () => axios.get(`${baseUrl}`).then(res => res.data)

export const createNew = async (content) => {
    const object = asObject(content)
    const response = await axios.post(`${baseUrl}`, object)
    return response.data
}

export const updatedAnecdote = updatedAnecdote => {
    return axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)
}
