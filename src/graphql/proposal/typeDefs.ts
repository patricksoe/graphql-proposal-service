const typeDefs = `
  type Proposal {
    id: ID!
    name: String!
    days: [Day!]!
    steps: [Step!]!
    createdAt: String!
    updatedAt: String!
  }
`;

export default typeDefs;
