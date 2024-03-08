import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import {  useEffect, useState } from "react"


const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] =  useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS}],
    onError: (err) => {
      console.log({err});
    }
  })

  const [ author, setAuthor ] = useState({name: '',born: ''})
  const [ authors, setAuthors ] = useState([])

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
      setAuthor(result.data.allAuthors[0])
    }
  }, [result.data])
    

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const submit = (event) => {
    event.preventDefault()

    editAuthor({
      variables: {
        name: author.name,
        setBornTo: Number(author.born)
      }
    })
  }

  const findAuthor = (name) => {
    const auth = authors.find(a => a.name === name)
    setAuthor(auth)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
            {
              authors.map((a) => (
                <tr key={a.name}>
                  <td>{a.name}</td>
                  <td>{a.born}</td>
                  <td>{a.bookCount}</td>
                </tr>
              ))
            }
        </tbody>
      </table>
      <h2>Set Birthyear</h2>
      {
        author &&
        <form onSubmit={submit}>
        <div>
            name
            {/* <input
              value={author.name}
              disabled={true}
              onChange={({ target }) => setAuthor(prev => ({...prev, name: target.value}))}
            /> */}
            <select value={author.name} 
              onChange={({ target }) => findAuthor(target.value)}>
              {
                authors.map((author) => <option key={`${author.name}`} value={author.name} >{author.name}</option>)
              }
            </select>
        </div>


        <div>
            born
            <input
              type="number"
                value={author.born == null ? 0 : author.born}
                onChange={({ target }) => setAuthor({...author, born: target.value})}
            />
        </div> <br />
        <button type="submit">Update author</button>
      </form>
      }
    </div>
  )
}

export default Authors
