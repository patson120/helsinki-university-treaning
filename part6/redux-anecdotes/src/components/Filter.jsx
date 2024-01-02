import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { filterAnecdote } from '../reducers/anecdoteReducer'

const Filter = () => {

  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter.filter)

  const handleChange = (event) => {
    dispatch(setFilter({text: event.target.value}))
    dispatch(filterAnecdote({text: event.target.value}))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter