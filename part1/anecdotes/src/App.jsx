import { useState } from 'react'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  const [mostVote, setMostVote] = useState({
    content: '',
    votes: 0
  })

  const onNextAnecdote = (max = anecdotes.length, min = 0) => {
    const index = Math.floor(Math.random() * (max - min)) + min;
    setSelected(index);
  }

  const onVote = () => {
    setPoints((prevPoints) => ({ ...prevPoints, [selected]: prevPoints[selected] + 1 }));
    if (points[selected] + 1 > mostVote.votes){
      setMostVote({content: anecdotes[selected], votes: mostVote.votes + 1})
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>Has {points[selected]} votes</p>
      <br />
      <button type='button' onClick={() => onVote()} >Vote</button>
      <button type='button' onClick={() => onNextAnecdote()} >Next anecdote</button>
      <br />
      {
        (mostVote.votes > 0) && <div>
          <h1>Anecdote with most votes</h1>
          <p>{mostVote.content}</p>
          <p>Has {mostVote.votes} votes</p>
        </div>
      }
    </div>
  )
}

export default App
