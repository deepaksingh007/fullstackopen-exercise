import gql from "graphql-tag";

export const SET_BORN = gql`
mutation editBorn($name: String!, $born: Int!){
  editAuthor(name: $name, setBornTo: $born) {
    name
    born
  }
}
`