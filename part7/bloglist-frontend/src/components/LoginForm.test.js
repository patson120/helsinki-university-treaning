
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'


describe("<LoginForm />", () => {
    test('User can login', () => {
        const handleLogin = jest.fn()
        const user = userEvent.setup()
        const username = 'root'
        const password = 'pass123'
        const changeUsername = jest.fn()
        const changePassword = jest.fn()
        render(
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => changeUsername(target.value)}
                handlePasswordChange={({ target }) => changePassword(target.value)}
                handleSubmit={handleLogin}
            />
        )
        const inputUsername = screen.getByPlaceholderText('Type your username')
        const inputPassword = screen.getByPlaceholderText('Type your password')
        const sendButton = screen.getByText('login')

        userEvent.type(inputUsername, 'root')
        userEvent.type(inputPassword, 'pass123')
        userEvent.click(sendButton)
        // expect(handleLogin.mock.calls).toHaveLength(1)
    })
})