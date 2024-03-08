
const Books = ({ books }: any) => {
  return (
    <div>
      {books.map((b: any) => (<Book key={`${b.id}`} book={b} />))}
    </div>
  )
}

export default Books



const Book = ({ book }: any) => {
  
  return (
    <>
      <h2>{book.title}</h2>
      <p>{book.author} - Published: {book.published}</p>
      <hr />
    </>
  )
}


