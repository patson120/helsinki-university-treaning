import { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button type='button' className='btn btn-primary' onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className='togglableContent'>
                {props.children}
                <button type="button" className="btn btn-primary" onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
}

export default Togglable