import gql from "graphql-tag";

export default gql`
  type Director {
    id: ID!
    name: String!
    bio: String # TODO: Not Nullable yap
    imageUrl: String
    movies: [Movie]
  }

  input DirectorInput {
    name: String!
    bio: String!
    imageUrl: String
  }

  type DirectorMutationResponse implements MutationResponse {
    success: Boolean!
    message: String
    director: Director
  }

  extend type Query {
    directors: [Director]
    director(id: ID!): Director
  }

  extend type Mutation {
    createDirector(director: DirectorInput!): DirectorMutationResponse
    updateDirector(id: ID!, director: DirectorInput!): DirectorMutationResponse
    deleteDirector(id: ID!): DirectorMutationResponse
  }
`;
