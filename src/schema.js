import { gql } from 'apollo-server-express';

export default gql`
  type Author {
    id: ID!
    info: Person
  }

  type Person {
    name: String!
    age: Int!
    gender: String!
  }

  type Query {
    hello: String
    getAuthors: [Author]
  }

  type Mutation {
    createAuthor(name: String!, age: Int!, gender: String!): Author
  }

  type Subscription {
    authorCreated: Author
  }
`;