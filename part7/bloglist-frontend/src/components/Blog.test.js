
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
    title: 'Blog 1',
    author: 'author 1',
    likes: 2,
    url: 'http://www.blog.com',
    id: 1,
    user: {
        username: 'user1',
        name: 'user',
        id: '1'
    }
}

describe('Blog render', function () {
    test('renders content', function() {
        const blog = {
            title: 'Blog 1',
            author: 'author 1',
            likes: 2,
            url: 'http://www.blog.com',
            id: 1,
            user: {
                username: 'user1',
                name: 'user',
                id: '1'
            }
        }
        const mockHandler = jest.fn()
        const { container } = render(<Blog blog={blog} />)
        // const element = screen.getByText((text) => text.includes('Blog 1'));
        // expect(element).toBeDefined()
        const div = container.querySelector('.blog')
        // screen.debug(div) //  Afficher du code html du composant
        expect(div).toHaveTextContent('Blog 1')

        const user = userEvent.setup()
        const button = screen.getByText((text) => text.includes('View'))
        // screen.debug(button)
        user.click(button)
        expect(mockHandler.mock.calls).toHaveLength(0)
    })

    test('renders content with only title and author', function() {
       
        const {container } = render(<Blog blog={blog} />)

        const element = screen.getByText((text) => text.includes(`${blog.title} ${blog.author}`))
        expect(element).toBeDefined()

        const url = container.querySelector('.url')
        expect(url).toBe(null)

        const likes = container.querySelector('.likes')
        expect(likes).toBe(null)
    })

    test("View details of a single blog", () => {
        const {container } = render(<Blog blog={blog} />)
        const user = userEvent.setup()
        const button = screen.getByText((text) => text.includes('View'))
        user.click(button)
        const url = container.querySelector('.url')
        expect(url).toBeDefined()

        const likes = container.querySelector('.likes')
        expect(likes).toBeDefined()
    })

    test("Double click on like button", () => {
        const {container } = render(<Blog blog={blog} />)
        const user = userEvent.setup()
        const button = container.querySelector('.like')
        user.dblClick(button)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })


})