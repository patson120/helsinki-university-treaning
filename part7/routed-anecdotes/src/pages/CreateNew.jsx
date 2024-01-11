import React, { useContext } from "react"

import { useNavigate } from 'react-router-dom'
import AnecdoteContext from "../AnecdoteContextProvider"
import { useField } from "../hooks"

const CreateNew = () => {
    const [_, dispatch] = useContext(AnecdoteContext)
    const content = useField('text')
    const author = useField('text')
    const info = useField('url')

    const handleSubmit = (e) => {
        e.preventDefault()
        addNew({
            content: content.value,
            author: author.value,
            info: info.value, 
            votes: 0 })
    }
    const navigate = useNavigate()

    const addNew = (anecdote) => {
        if (!anecdote.content) return
        anecdote.id = Math.round(Math.random() * 10000)
        dispatch({ type: 'ADD_ANECDOTE', payload: { anecdote } })
        dispatch({ type: 'SET_NOTIFICATION', payload: { text: `A new anecdote '${anecdote.content}' created!` } })
        setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 5000)
        navigate('/')
    }

    const handleReset= () => {
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' type={content.type} value={content.value} onChange={content.onChange} />
                </div>
                <div>
                    author
                    <input name='author' type={author.type} value={author.value} onChange={author.onChange} />
                </div>
                <div>
                    url for more info
                    <input name='info' type={info.type} value={info.value} onChange={info.onChange} />
                </div>
                <button type="submit">create</button>
                <button type="button" onClick={handleReset}>reset</button>
            </form>
        </div>
    )
}

export default CreateNew