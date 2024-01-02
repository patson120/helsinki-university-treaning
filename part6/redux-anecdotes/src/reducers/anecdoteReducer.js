import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const anecdote = state.find(a => a.id === action.payload.anecdote.id)
      anecdote.votes = action.payload.anecdote.votes
    },
    createAnecdote: (state, action) => {
      return [action.payload.anecdote, ...state]
    },
    filterAnecdote: (state, action) => {
      if (action.payload.text === '')
        return [...initialState]
      return state.filter(a => a.content.toLowerCase().includes(action.payload.text.toLowerCase()))
    },
    setAnecdotes: (state, action) => {
      return action.payload.anecdotes
    }
  }
})

export const {
  voteAnecdote,
  createAnecdote,
  filterAnecdote, setAnecdotes
}
  = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes({ anecdotes }))
  }
}

export const createNewAnecdote = ({ content }) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote({ anecdote }))
  }
}

export const updateAnecdote = ({ anecdote }) => {
  return async dispatch => {
    const updateAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch(voteAnecdote({ anecdote: updateAnecdote }))
  }
}

export default anecdoteSlice.reducer