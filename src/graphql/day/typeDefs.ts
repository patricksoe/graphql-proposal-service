const typeDefs = `#graphql
  type Day {
    id: ID!
    order: Int!
    name: String!
    proposalId: ID!
    stepId: ID!
    createdAt: String!
    updatedAt: String!
  }
`;

export default typeDefs;
