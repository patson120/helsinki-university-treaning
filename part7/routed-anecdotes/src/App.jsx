
import {
  Routes, Route
} from 'react-router-dom'
import AnecdoteList from './componets/AnecdoteList'
import About from './pages/About'
import CreateNew from './pages/CreateNew'
import Menu from './componets/Menu'
import Footer from './componets/Footer'
import AnecdoteDetail from './pages/AnecdoteDetail'
import Notification from './componets/Notification'
import { useContext } from 'react'
import AnecdoteContext from './AnecdoteContextProvider'

const App = () => {
  const [ state, _] = useContext(AnecdoteContext)
  const notification = state.notification
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList />} />
        <Route path="/anecdotes/:id" element={<AnecdoteDetail />} />
        <Route path="/create" element={<CreateNew />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
