import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { AnecdoteContextProvider } from './AnecdoteContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <AnecdoteContextProvider>
            <App />
        </AnecdoteContextProvider>
    </Router>
)