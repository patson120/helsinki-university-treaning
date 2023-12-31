import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notification: ''
    },
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload.text
        }
    }
})

export const  { setNotification } = notificationSlice.actions

export default notificationSlice.reducer