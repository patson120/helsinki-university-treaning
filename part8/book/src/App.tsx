
import { useQuery } from '@apollo/client'
import './App.css'

import Books from './components/Books'
import { ALL_BOOKS } from './queries'



function App() {

  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <Books books={result.data.allBooks} />
  )
}

export default App
