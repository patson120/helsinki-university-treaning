import { useState } from 'react'

function App() {

  // enregistrer les clics de chaque bouton dans un état différent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const onGood = () => { setGood(prev => prev + 1) };
  const onNeutral = () => { setNeutral(prev => prev + 1) };
  const onBad = () => { setBad(prev => prev + 1) };

  const all = good + neutral + bad;
  const average = 3 / all;
  const positive = (good / all) * 100 + "%";

  return (
    <>
      <h1>Give feedback</h1>
      <button type="button" onClick={onGood} >Good</button>
      <button type="button" onClick={onNeutral}>Neutral</button>
      <button type="button" onClick={onBad}>Bad</button>

      {
        (good | neutral | bad) ?
          <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} /> :
          <p>No FeedBack given</p>
      }
    </>
  )
}

export default App;

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={all} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positive} />
        </tbody>
      </table>

    </>
  );
}


const StatisticLine = ({ text, value }) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  );
}
