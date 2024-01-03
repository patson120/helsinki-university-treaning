import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { getAnecdotes, updatedAnecdote } from './request'
import { useContext } from 'react'
import NotificationContext from './components/NotificationContext'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updatedAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 },
      {
        onSuccess: (data) => {
          dispatch({ type: 'SET_NOTIFICATION', payload: { text: `Anecdote '${anecdote.content}' voted` } })
          setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
          }, 2500);
        }
      }
    )
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 3,
    refetchOnWindowFocus: false
  })
  // console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.error) {
    return <div style={{ textAlign: 'center'}}>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification message={notification} />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
