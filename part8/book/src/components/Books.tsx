import { useQuery } from "@apollo/client"
import { useState } from "react"
import BookForm from "./BookForm"
import { FIND_BOOK } from "../queries"



const Books = ({ books }: any) => {

  const [titleToSearch, setTitleToSearch] = useState(null)

  const result = useQuery(FIND_BOOK, {
    variables: { titleToSearch },
    skip: !titleToSearch
  })

  if (titleToSearch && result.data) {    
    return (<Book
      book={result.data.findBook}
      onClose={() => setTitleToSearch(null)}
    />)
  }

  return (
    <div>
      <hr />
      <h2>Books</h2>
      {books.map((book: any) => (
        <div key={`${book.id}`}>
          <h2>{book.title}</h2>
          <p>{book.author} - Published: {book.published}</p>
          <button onClick={() => setTitleToSearch(book.title)} >Show genre</button>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default Books

const Book = ({ book, onClose }: any) => {
  return (
    <>
      <h2>{book.title}</h2>
      <p>{book.author} - Published: {book.published}</p>
      <p> { book.genres.map((genre: any) => genre).join("; ") } </p>
      <button onClick={onClose} >Close</button>
      <hr />
    </>
  )
}


