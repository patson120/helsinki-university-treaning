import React, { useContext } from "react"

import { useMatch, Link, useNavigate } from 'react-router-dom'
import AnecdoteContext from "../AnecdoteContextProvider";

const AnecdoteDetail = () => {
    const match = useMatch('/anecdotes/:id')
    const [state, _] = useContext(AnecdoteContext)
    const anecdote = state.anecdotes.find(a => `${a.id}` === `${match.params.id}`)    
    
    if (!match || !anecdote) {
        return <p>Page not found</p>
    }
    return (
        <>
            <h1>{anecdote.content}</h1>
            <p>has {anecdote.votes} votes</p>
            <p>For more info see <Link to={anecdote.info} >{anecdote.info}</Link></p>
        </>
    )
}

export default AnecdoteDetail