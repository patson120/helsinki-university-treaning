
const Persons = ({ books }: any) => {
  return (
    <div>
      {books.map((b: any) => (<Person key={`${b.id}`} person={b} />))}
    </div>
  )
}

export default Persons



const Person = ({ person }: any) => {
  
  return (
    <>
      <h2>{person.title}</h2>
      <p>{person.author} - Published: {person.published}</p>
      <hr />
    </>
  )
}


