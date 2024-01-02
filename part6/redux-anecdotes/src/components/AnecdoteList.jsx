import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(updateAnecdote({ anecdote }))
        dispatch(setNotification({text: `You voted '${anecdote.content}'`}))
        setTimeout(() => {
            dispatch(setNotification({ text: '' }))
        }, 5000);
    }
    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}
export default AnecdoteList