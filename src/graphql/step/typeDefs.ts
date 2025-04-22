const typeDefs = `#graphql
  type Step {
    id: ID!
    order: Int!
    name: String!
    proposalId: ID!
    days: [Day!]!
    createdAt: String!
    updatedAt: String!  
  }  
`;

export default typeDefs;
