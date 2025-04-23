const typeDefs = `#graphql
  type Proposal {
    id: ID!
    name: String!
    steps: [Step!]!
    days: [Day!]!
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
    updateProposal(id: ID!, input: ProposalInput!): Proposal!
    deleteProposal(id: ID!): Proposal!
  }
`;

export default typeDefs;
