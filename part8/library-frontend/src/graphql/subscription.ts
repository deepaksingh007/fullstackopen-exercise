import {BOOK_DETAILS} from './queries/book'
import gql from 'graphql-tag'
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`