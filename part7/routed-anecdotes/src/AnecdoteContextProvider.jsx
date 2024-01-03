import { createContext, useReducer } from 'react'

const anecdoteReducer = (state, action) => {
    switch (action.type) {

        case "ADD_ANECDOTE":
            return { ...state, anecdotes: [ action.payload.anecdote, ...state.anecdotes] }
        case "SET_NOTIFICATION":
            return { ...state, notification: action.payload.text }
        case "CLEAR_NOTIFICATION":
            return { ...state, notification: '' }
        default:
            return state
    }
}

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = (props) => {
    const [state, dispatch] = useReducer(anecdoteReducer, {
        anecdotes: [
            {
                content: 'If it hurts, do it more often',
                author: 'Jez Humble',
                info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
                votes: 0,
                id: 1
            },
            {
                content: 'Premature optimization is the root of all evil',
                author: 'Donald Knuth',
                info: 'http://wiki.c2.com/?PrematureOptimization',
                votes: 0,
                id: 2
            }
        ],
        notification: ''
    })

    return (
        <AnecdoteContext.Provider value={[state, dispatch]}>
            {props.children}
        </AnecdoteContext.Provider>
    )
}

export default AnecdoteContext