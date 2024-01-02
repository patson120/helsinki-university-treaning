import { useDispatch } from "react-redux";
import { setNotification } from "./notificationReducer"


export const createNotification = (text, time) => {
    const dispatch = useDispatch()
    dispatch(setNotification({text}))
    setTimeout(() => {
        dispatch(setNotification({text: ''}))  
    }, time);
}