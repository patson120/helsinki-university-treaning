import React, { useContext, useState } from "react"

import { useNavigate } from 'react-router-dom'
import AnecdoteContext from "../AnecdoteContextProvider"

const CreateNew = () => {
    const [_, dispatch] = useContext(AnecdoteContext)
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        addNew({ content, author, info, votes: 0 })
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

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div>
                    author
                    <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    url for more info
                    <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

export default CreateNew