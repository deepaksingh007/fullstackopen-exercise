import gql from "graphql-tag"

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author{
      name
    }
    published
    genres
  }
` 
export const ALL_BOOKS = gql`
{
  allBooks{
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const BOOKS_BY_GENRE = gql`
query bookByGenre($genre: String){
  allBooks(genre: $genre){
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
