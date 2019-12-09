import {BOOK_DETAILS} from './query'
import gql from 'graphql-tag'
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`