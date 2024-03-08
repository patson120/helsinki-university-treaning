
import './App.css'

import { gql, useQuery } from '@apollo/client'
import Persons from './components/Persons'

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published,
      id
    }
  }
`

function App() {

  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <Persons books={result.data.allBooks} />
  )
}

export default App
