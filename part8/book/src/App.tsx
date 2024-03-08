
import './App.css'

import { gql, useQuery } from '@apollo/client'
import Books from './components/Books'

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
    <Books books={result.data.allBooks} />
  )
}

export default App
