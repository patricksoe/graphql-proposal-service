export const typeDefs = `#graphql
  type Day {
    id: ID!
    order: Int!
    name: String!
    proposalId: Int!
    stepId: Int!
    createdAt: String!
    updatedAt: String!
  }

  input DayInput {
    order: Int!
    name: String!
    proposalId: Int
    stepId: Int
  }

  type Query {
    days: [Day!]!
    day(id: ID!): Day
  }

  type Mutation {
    createDay(input: DayInput!): Day!
    updateDay(id: ID!, input: DayInput!): Day!
    deleteDay(id: ID!): Day!
  }
`;

export default typeDefs;
