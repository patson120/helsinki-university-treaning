import { useMutation } from "@apollo/client"
import { FormEvent, useState } from "react"

import { ADD_BOOK, ALL_BOOKS } from '../queries'



const BookForm = ({ setError }: any) => {

    const [createBook] = useMutation(ADD_BOOK,
        {
            refetchQueries: [{ query: ALL_BOOKS }],
            onError: (error: any) => {
                const message = error.graphQLErrors.map((err: any) => err.message).join('\n')
                setError(message)
            }
        }
    )

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [published, setPublished] = useState("")
    const [genres, setGenres] = useState("")

    const submit = (event: FormEvent) => {
        event.preventDefault()
        createBook({
            variables: {
                title: title,
                author: author,
                published: Number(published),
                genres: genres.split(',')
            }
        })
        setTitle('')
        setAuthor('')
        setPublished("")
        setGenres('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submit}>
                <div>Title <input value={title} onChange={({ target }) => setTitle(target.value)} /></div>
                <div>author <input value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
                <div>Published <input value={published} type="number" onChange={({ target }) => setPublished(target.value)} /></div>
                <div>Genres <input value={genres} onChange={({ target }) => setGenres(target.value)} /></div>
                <button type='submit'>add!</button>
            </form>
        </div>
    )
}

export default BookForm
