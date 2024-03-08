import { gql, useMutation } from "@apollo/client"
import { FormEvent, useState } from "react"


const ADD_BOOK = gql`
    mutation add_new_book($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            id
            title
            author
            published
        }
    }
`
const BookForm = () => {
    
    const [createBook] = useMutation(ADD_BOOK)
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [published, setPublished] = useState(0)
    const [genres, setGenres] = useState("")

    const submit = (event: FormEvent) => {
        event.preventDefault()
        createBook({
            variables: {
                title: title,
                author: author,
                published,
                genres: genres.split(',')
            }
        })
        setTitle('')
        setAuthor('')
        setPublished(0)
        setGenres('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submit}>
                <div>
                    Title <input value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author <input value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Published <input value={published}
                    type="number"
                        onChange={({ target }) => setPublished(Number(target.value))}
                    />
                </div>
                <div>
                    Genres <input value={genres}
                        onChange={({ target }) => setGenres(target.value)}
                    />
                </div>
                <button type='submit'>add!</button>
            </form>
        </div>
    )
}

export default BookForm
