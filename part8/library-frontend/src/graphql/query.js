import gql from "graphql-tag"

export const ALL_BOOKS = gql(`{
  allBooks{
    title
    author{
      name
    }
    published
    genres
  }
}`)

export const BOOKS_BY_GENRE = gql(`query bookByGenre($genre: String!){
  allBooks(genre: $genre){
    title
    author{
      name
    }
    published
    genres
  }
}`)

export const ALL_AUTHORS = gql(`{
  allAuthors{
    name
    born
    bookCount
  }
}`)

export const ALL_AUTHORS_AND_BOOKS = gql(`{
  allBooks{
    title
    author{
      name
    }
    published
    genres
  }
  allAuthors{
    name
    born
    bookCount
  }
}`)

