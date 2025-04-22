const typeDefs = `#graphql
  type Proposal {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  input ProposalInput {
    name: String!
  }

  type Query {
    proposals: [Proposal!]!
    proposal(id: Int!): Proposal
  }

  type Mutation {
    createProposal(input: ProposalInput!): Proposal!
  }
`;

export default typeDefs;
