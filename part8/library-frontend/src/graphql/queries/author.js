import gql from "graphql-tag"

export const ALL_AUTHORS = gql(`{
  allAuthors{
    name
    born
    bookCount
  }
}`)
