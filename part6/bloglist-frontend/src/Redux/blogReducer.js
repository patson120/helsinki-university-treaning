
import { createStore } from 'redux'


const blogReducer = (state = [], action) => {
    if (action.type === 'NEW_BLOG') {
        state.push(action.payload)
        return state
    }

    return state
}

const store = createStore(blogReducer)