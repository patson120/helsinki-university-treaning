
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createNew } from '../request'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const AnecdoteForm = () => {

  const [_, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
  })



  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate(
      content, {
      onError: (err) => {
        dispatch({ type: 'SET_NOTIFICATION', payload: { text: `${err.response.data.error}` } })
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 2500);
      },
      onSuccess: (data) => {
        dispatch({ type: 'SET_NOTIFICATION', payload: { text: `A new anecdote ${content}` } })
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 2500);
      }
    }
    )


  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
