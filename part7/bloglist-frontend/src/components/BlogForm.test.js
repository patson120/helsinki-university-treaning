
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('Blog form', function () {
    test('add new blog', function() {
        const mockHandler = jest.fn()
        const { container } = render(<BlogForm create={mockHandler} />)
        const user = userEvent.setup()

        const title = container.querySelector('.title')
        const author = container.querySelector('.author')
        const url = container.querySelector('.url')

        userEvent.type(title, 'First title')
        userEvent.type(author, 'Author 1')
        userEvent.type(url, 'https://www.google.com')

        const sendButton = container.querySelector('.btn-create')
        user.click(sendButton)

        expect(mockHandler.mock.calls).toHaveLength(1)
    })

})