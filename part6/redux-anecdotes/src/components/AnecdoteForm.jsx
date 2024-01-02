
import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const onSubmit = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        if (content) {
            dispatch(createNewAnecdote({content}))
            dispatch(setNotification({text: `New anecdote '${content}'`}))
            setTimeout(() => {
                dispatch(setNotification({text: ''}))  
            }, 5000);
        }
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={onSubmit}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}
export default AnecdoteForm