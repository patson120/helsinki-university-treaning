

import { gql } from '@apollo/client'

export const FIND_BOOK = gql`
  query findBookByName($titleToSearch: String!) {
    findBook(title: $titleToSearch) {
      title
      author
      published
      genres
      id
    }
  }
`

export const ADD_BOOK = gql`
    mutation add_new_book($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            id
            title
            author
            published
        }
    }
`

export const ALL_BOOKS = gql`
    query {
    allBooks {
        title
        author
        published,
        id
    }
    }
`