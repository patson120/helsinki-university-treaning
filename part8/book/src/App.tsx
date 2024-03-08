
import { useQuery } from '@apollo/client'
import './App.css'

import Books from './components/Books'
import { ALL_BOOKS } from './queries'
import { useState } from 'react'
import BookForm from './components/BookForm'



function App() {

  const result = useQuery(ALL_BOOKS)

  const [errorMessage, setErrorMessage] = useState(null)

  if (result.loading) {
    return <div>Loading...</div>
  }

  const notify = (message: any) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <Books books={result.data.allBooks} />
      <BookForm setError={notify} />
    </>
  )
}

export default App


const Notify = ({ errorMessage }: any) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}