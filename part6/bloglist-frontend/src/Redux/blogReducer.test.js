import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
    test('returns new state with action NEW_BLOG', () => {
        const state = []
        const action = {
            type: 'NEW_NOTE',
            payload: {
                title: 'the app state is in redux store',
                author: 'John Doe',
                url: 'http://localhost:3001'
            }
        }

        deepFreeze(state)
        const newState = blogReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.payload)
    })
})