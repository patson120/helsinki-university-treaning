
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createNew } from '../request'

const AnecdoteForm = () => {

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
    newNoteMutation.mutate(content)
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
