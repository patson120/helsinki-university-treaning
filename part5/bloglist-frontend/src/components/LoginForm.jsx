import PropTypes from 'prop-types'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {

    return (
        <div className='formDiv'>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        name='username'
                        placeholder='Type your username'
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        name='password'
                        placeholder='Type your password'
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}